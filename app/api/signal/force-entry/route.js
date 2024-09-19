import { adminDb } from '@/lib/firebase-admin-config';
import moment from 'moment';

const threeCommasUrl = 'https://app.3commas.io/trade_signal/trading_view';
export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(threeCommasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const resultFetch = await res.text();
      await adminDb.collection('3commas_logs').add({
        createdAt : new Date(),
        type : body?.actions ? 'force_exit':'force_entry',
        bot_id : body?.bot_id || '',
        requestBody : JSON.stringify(body),
        pair : body?.pair,
        timestamp:moment().unix()*1000,
        statusCode : res.status || resultFetch.status
      })

      return Response.json({
        status : 'success',
        result : resultFetch
      },{status : res.status})
  } catch (error) {
    return Response.json({
        status : 'failed',
        error:error.message,
    })
  }
}
