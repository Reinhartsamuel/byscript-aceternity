import { adminDb } from '../../../../lib/firebase-admin-config';

export async function POST(request) {
  try {
    const body = await request.json();
    // console.log(body);
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
    const threeCommasUrl = 'https://app.3commas.io/trade_signal/trading_view';

    // find bots id
    const doc = await adminDb
      .collection('test_bot')
      .doc(body?.trading_plan_id)
      .get();
    if (!doc.exists) {
      console.log(
        `No such document! id ::: ${body?.trading_plan_id || ''}, timestamp : `,
        new Date().getTime()
      );
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
      botsArray?.map(async (x) => {
        const sendBodyTo3Commas = {
          message_type: 'bot',
          bot_id: parseInt(x),
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
        const returnValue = await res.json();
        return returnValue;
      })
    );

    // console.log(resultMap, 'resultMap promise allsettled');
    await adminDb.collection('webhooks').add({
      ...body,
      type: 'autotrade',
      createdAt: new Date(),
    //   result: result.map((x) => x?.status),
    });

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
