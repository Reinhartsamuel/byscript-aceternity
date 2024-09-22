import { adminDb } from '@/lib/firebase-admin-config';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export async function GET (request) {
    try {
        const test =  userAgent(request);
        console.log(request.url, 'request.url');
        console.log(test, 'userAgent');
        const ipAddress = IP();
        return Response.json({hello:'world',userAgent:test.ua||'', ipAddress})
    } catch (error) {
        return Response.json({ status : false, message : error.message, error },{status : 500});
    }
}

function IP() {
    const FALLBACK_IP_ADDRESS = '0.0.0.0'
    const forwardedFor = headers().get('x-forwarded-for')

    if (forwardedFor) {
      return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
    }

    return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
  }

// export async function GET() {
//   try {
//     let logsArr = [];

//     const citiesRef = adminDb.collection('3commas_logs').orderBy('createdAt', 'desc').limit(100);
//     const snapshot = await citiesRef.get();
//     snapshot.forEach((doc) => {
//      logsArr.push({id : doc.id, ...doc.data()})
//     });

//     await Promise.all(logsArr.map(async (x) => {
//         let botsArr = [];

//         const bot_id = x?.bot_id;
//         console.log(bot_id,'bot_id');
//         console.log(typeof bot_id,'typeof bot_id');

//         const citiesRef = adminDb.collection('dca_bots').where('bot_id', '==', bot_id);
//         const snapshot = await citiesRef.get();
//         snapshot.forEach((doc) => {
//             botsArr.push({id : doc.id, ...doc.data()})
//         });
//         const botData = botsArr[0];
//         console.log('this is the logs id:::::',x.id, 'this is the bot id and bot_id::::', botData?.id,botData?.bot_id, 'uid orang::::', botData?.uid, botData?.email, botData?.name);
//         const cityRef = adminDb.collection('3commas_logs').doc(x?.id);
//         await cityRef.update({name:botData?.name||'', email :botData?.email||'', uid:botData?.uid||''});
//     }))
//     return Response.json({
//         status : 'success',
//         data : logsArr
//     })
//   } catch (error) {
//     return Response.json({
//         error : error.message,
//         status: false,
//       });
//   }
// }
