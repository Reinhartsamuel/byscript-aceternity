import moment from 'moment';

export async function POST(request) {
    const body = await request.json();
    // const ipAddress = request.headers;
    console.log(request.headers['x-forwarded-for'], 'request.headers[x-forwarded-for]');

    const htmlContent = `<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Document</title>
        <style>
        *{padding:0; margin : 0; font-family:Arial, Helvetica, sans-serif}
        </style>
    </head>
    <body>
        <div style='width:100%; display:flex; justify-content:center;align-items:center;'>
          <div style='display:table-row;flex-direction:column; justify-content:center;align-items:center;'>
          <h1 style='margin-bottom:50px'>Selamat datang di byScript.io!</h1>
          <a href='https://byscript.io' style='display:flex; justify-content:center;align-items:center;'>
            <img src='https://deoapp-bucket.s3.ap-southeast-1.amazonaws.com/folder/v1/xx/you!%20(1).png' alt='affiliate' width='100%' />
          </a>
          <div style='margin-top:50px'>
              Hai, <strong>${body?.name}</strong>, anda telah login ke byScript.io. Jelajahi lebih lanjut trading plan 
            byScript, atau buat trading plan kamu sendiri untuk autotrade tanpa pikir pusing. HAPPY CUAN!!😇😇
          </div>
        </div
      </div>
    </body>
    </html>`


    const emailBody = {
    sender: {
      name: "byScript.io",
      email:'edwinfardyanto@mgail.com'
    },
    bcc : [{
      name: "reieie",
      email: 'reinhartsams@gmail.com'
    }],
    to: [
      {
        email: body?.email,
        name: body?.name
      }
    ],
    subject:"Kamu Telah Login di byScript",
    htmlContent: htmlContent 
  }

  if (body?.content) emailBody.htmlContent = body?.content;
  if (body?.subject) emailBody.subject = body?.subject;

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method : 'post',
            body : JSON.stringify(emailBody),
            headers: {
                      'accept': 'application/json',
                      'api-key': process.env.BREVO_API_KEY,
                      'content-type': 'application/json'
                }
        });
        const result = await res.json();
        return Response.json({ ...result});
    } catch (error) {
        return Response.json({ status : false, message : error.message});
    }
  }
  