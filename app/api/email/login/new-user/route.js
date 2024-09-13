import moment from 'moment';

export async function POST(request) {
  const body = await request.json();
  const htmlContent = `<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Document</title>
        <style>
        *{padding:0; margin : 0; font-family:Arial, Helvetica, sans-serif}
          .affiliateButton {
			width : 100%;;
          	display : flex;
          	justify-content:center;
          	align-items:center;
          	flex-direction : column;
          }
          .affiliateLink {
			padding : 10px;
          	background-color:white;
          	border-radius:1em;
          	margin-top:10px;
          	color:blue;
          	border-color:lightblue;
          	border:1px;
          	border-width:2em;
          	font-weight:bold;
          	text-decoration:underline;
          }
        </style>
    </head>
    <body>
        <div style='width:100%; display:flex; justify-content:center;align-items:center;'>
          <div style='display:table-row;flex-direction:column; justify-content:center;align-items:center;'>
          <h1 style='margin-bottom:50px'>Selamat datang di byScript.io!</h1>
                      <div style='margin-top:50px'>
              Hai, <strong>Reinhart</strong>, anda telah login ke byScript.io. Jelajahi lebih lanjut trading plan 
            byScript, atau buat trading plan kamu sendiri untuk autotrade tanpa pikir pusing. HAPPY CUAN!!😇😇
          </div>
          <a href='https://byscript.io' style='display:flex; justify-content:center;align-items:center;'>
            <img src='https://deoapp-bucket.s3.ap-southeast-1.amazonaws.com/folder/v1/xx/you!%20(1).png' alt='affiliate' width='100%' />
          </a>
            <div class='affiliateButton'>
              <img src='https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1' width='100' />
              <div class='affiliateLink'>
					<a
                       href='https://wa.me/6281313383848/?text=Halo kak, saya ingin tanya-tanya untuk program affiliatenya'
                       >Konsultasi affiliate sekarang (WA)</a>
              </div>
               <img src='https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1' width='100' style='transform:rotate(180deg)' />
            </div>
        </div
      </div>
    </body>
    </html>`;

  const emailBody = {
    sender: {
      name: 'byScript.io',
      email: 'edwinfardyanto@gmail.com',
    },
    to: [
      {
        email: body?.email,
        name: body?.name,
      },
    ],
    bcc: [
      { name: 'Reinhart', email: 'reinhartsams@gmail.com' },
      // {name : 'Edwin', email : 'edwinfardyanto@gmail.com'},
    ],
    subject: 'Registrasi byScript',
    htmlContent: htmlContent,
  };

  if (body?.content) emailBody.htmlContent = body?.content;

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
