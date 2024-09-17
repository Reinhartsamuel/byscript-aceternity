import moment from 'moment';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const ipAddress = IP();
  const {ua} =  userAgent(request);


  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
      }
      .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .gradient-text {
        background-image: linear-gradient(to right, #6c5ce7, #7a29cb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        margin-left: 10px;
        font-family: 'eco_coding', Arial, Helvetica, sans-serif;
      }
      .nav {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: black;
      }
      .subtitle {
        color: white;
        font-style: italic;
        letter-spacing: 1px;
        font-size: 12px;
        font-weight: 200;
      }
      .container {
        width: 100%;
        background-color: #f3f4f6;
        border-radius: 1rem;
        padding: 1rem;
      }
      @font-face {
        font-family: 'eco_coding';
        src: url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.eot');
        src: url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.eot?#iefix')
            format('embedded-opentype'),
          url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.woff2')
            format('woff2'),
          url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.woff')
            format('woff'),
          url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.ttf')
            format('truetype'),
          url('https://db.onlinewebfonts.com/t/fce1ae337c2b8b2bf2518b7d5127e030.svg#Eco Coding WGL4 W01 Regular')
            format('svg');
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/byscript-io.appspot.com/o/byscript-email-header.png?alt=media&token=e58b1b64-82b2-4452-9010-572c2184cae1"
        style="width: 100%; background-color: black"
      />
    </div>
    <div class="main">
      <div class="container">
        <p>Hi ${body?.name},</p>
        <br />
        <p>Kamu baru saja login ke akun byScript.</p>
        <br />
        <strong>Login time</strong>: ${moment().format('YYYY-MM-DD HH:mm:ss')}<br />
        <strong>IP address</strong>: ${ipAddress}<br />
        <strong>User agent</strong>: ${ua}<br />
        <br />
        <p>
          Best regards,<br />
          byScript Team
        </p>
      </div>
    </div>
  </body>
</html>
`;

  const emailBody = {
    sender: {
      name: 'byScript.io',
      email: 'edwinfardyanto@mgail.com',
    },
    bcc: [
      {
        name: 'reieie',
        email: 'reinhartsams@gmail.com',
      },
    ],
    to: [
      {
        email: body?.email,
        name: body?.name,
      },
    ],
    subject: 'Kamu Telah Login di byScript',
    htmlContent: htmlContent,
  };

  if (body?.content) emailBody.htmlContent = body?.content;
  if (body?.subject) emailBody.subject = body?.subject;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'post',
      body: JSON.stringify(emailBody),
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
    });
    const result = await res.json();
    return Response.json({ ...result });
  } catch (error) {
    return Response.json({ status: false, message: error.message });
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