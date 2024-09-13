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