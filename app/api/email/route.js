export async function POST(request) {
  try {
    const body = await request.json();

    let htmlContent = '';
    // const emailBody = {
    //   ...body,
    //   sender: {
    //     name: 'byScript.io',
    //     email: 'edwinfardyanto@mgail.com',
    //   },
    //   bcc: [
    //     {
    //       name: 'reieie',
    //       email: 'reinhartsams@gmail.com',
    //     },
    //   ],
    //   to: [
    //     {
    //       email: body?.email,
    //       name: body?.name,
    //     },
    //   ],
    //   subject: 'Kamu Telah Login di byScript',
    //   htmlContent: htmlContent,
    // };

    console.log(body);

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
    });
    const result = await res.json();
    return Response.json({
      status: true,
      message: 'Email successuflly sent',
      ...result,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message: error.message,
      data: 'Internal server error',
      error: error,
    }, { status: 500 });
  }
}
