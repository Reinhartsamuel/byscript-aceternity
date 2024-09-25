import { adminDb } from '@/lib/firebase-admin-config';
import { FieldValue } from 'firebase-admin/firestore';

const threeCommasUrl = 'https://app.3commas.io/trade_signal/trading_view';

// THIS IS WHAT THE BODY LOOKS LIKE :
// {
//   message_type: 'bot',
//   bot_id: '',
//   email_token: '52c6860e-5814-47ed-a5ae-663d78446439',
//   delay_seconds: 0,
//   pair: 'USDT_BTC',
//   trading_plan_id: 'XMA_USDT_BTC',
// };
// ------ OR -------
// {
//     "action": "close_at_market_price",
//     "message_type": "bot",
//     "bot_id": “”,
//     "email_token": "52c6860e-5814-47ed-a5ae-663d78446439",
//     "delay_seconds": 0,
//     "pair": "USDT_BTC”,
//     "trading_plan_id" : “XMA_USDT_BTC”
//   }

// THIS IS WHAT SHOULD BE SENT TO 3COMMAS :
// {
//   message_type: 'bot',
//   bot_id: 14359731,
//   email_token: '',
//   delay_seconds: 0,
//   pair: '',
// };

export async function POST(request) {
  try {
    const body = await request.json();
    const addWebhookResult = await adminDb.collection('webhooks').add({
      ...body,
      type: 'autotrade',
      createdAt: new Date(),
      // result: result.map((x) => x?.status),
    });
    // console.log(body);

    // trading_plan_id is constructed of trading plan name and pair
    const tp_unique_id = body?.trading_plan_id + '_' + body?.pair;

    // find bots id
    const doc = await adminDb
      .collection('trading_plan_pair')
      .doc(tp_unique_id)
      .get();
    if (!doc.exists) {
      try {
        console.log(
          `No such document! id ::: ${
            body?.trading_plan_id || ''
          }, timestamp : `,
          new Date().getTime(),
          'creating',
          tp_unique_id
        );
        await adminDb.collection('trading_plan_pair').doc(tp_unique_id).set({
          bots_id: [],
          createdAt: new Date(),
          lastUpdated: new Date(),
          pair: body?.pair,
          trading_plan_id: body.trading_plan_id,
        });
        const tradingPlanDoc = await adminDb
          .collection('trading_plan')
          .doc(body.trading_plan_id)
          .get();

        if (!tradingPlanDoc.exists) {
          console.log(
            `trading plan not found, creating ID : ${body.trading_plan_id}`
          );
          await adminDb
            .collection('trading_plans')
            .doc(body.trading_plan_id)
            .set({
              id: body?.trading_plan_id || '',
              name: body?.trading_plan_id || '',
              childrenPairs: FieldValue.arrayUnion(body?.pair),
              createdAt: new Date(),
            });
        }

        return new Response('no bots!', {
          status: 400,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    const data = doc.data();
    const botsArray = data?.bots_id || [];

    if (botsArray?.length === 0) {
      console.log('no bots available, timestamp : ', new Date().getTime());
      return new Response('no bots!', {
        status: 400,
      });
    }

    const result = await Promise.allSettled(
      botsArray?.map(async (bot, i) => {
        const sendBodyTo3Commas = {
          message_type: 'bot',
          bot_id: parseInt(bot),
          email_token: body?.email_token,
          delay_seconds: body?.delay_seconds,
          pair: body?.pair,
        };
        if (body?.action) sendBodyTo3Commas.action = body?.action;
        const res = await fetch(threeCommasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendBodyTo3Commas),
        });
        if (parseInt(i) == 0)
          console.log(JSON.stringify(sendBodyTo3Commas), 'sendBodyTo3Commas');
        const returnValue = await res.text();
        return { ...returnValue, statusCode: res.status, sendBodyTo3Commas };
      })
    );

    if (Array.isArray(result) && result?.length > 0) {
      await Promise.allSettled(
        result?.map(async (x) => {
          let findBotOwner = {email:'', uid:'', name:''};
          const botsRef = adminDb.collection('dca_bots');
          const snapshot = await botsRef.where('bot_id', '==', x?.value?.sendBodyTo3Commas?.bot_id?.toString()).get();
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              findBotOwner.email = doc.data()?.email || '';
              findBotOwner.name = doc.data()?.name || '';
              findBotOwner.uid = doc.data()?.uid || '';
              findBotOwner.exchange_name = doc.data()?.exchange_name || '';
              findBotOwner.exchange_thumbnail = doc.data()?.exchange_thumbnail || '';
              findBotOwner.autotraderCreatedAt = doc.data()?.createdAt || '';
            });
          } 
          await adminDb.collection('3commas_logs').add({
            requestBody: JSON.stringify(body),
            createdAt: new Date(),
            response: x,
            autotradePostBody: x?.sendBodyTo3Commas || null,
            webhookId: addWebhookResult?.id || '',
            trading_plan_id: body?.trading_plan_id,
            pair: body?.pair || '',
            timeframe: body?.timeframe || '',
            timestamp: body?.timestamp || '',
            bot_id: x?.value?.sendBodyTo3Commas?.bot_id,
            type: 'autotrade',
            ...findBotOwner
          });
        })
      );
    }

    // find if tradingplan already exists

    return new Response('ok', {
      status: 200,
    });
  } catch (error) {
    console.log(error.message, 'error autotrade');
    return new Response(error.message, {
      status: 400,
    });
  }
}
