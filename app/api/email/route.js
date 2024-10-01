import autotraderRequestTemplate from '@/app/utils/emailHtmlTemplates/autotraderRequestTemplate';
import moment from 'moment';

export async function POST(request) {
  try {
    const body = await request.json();

    // let htmlContent = '';
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
      // bcc: [
      //   // { name: 'Reinhart', email: 'reinhartsams@gmail.com' },
      //   // {name : 'Edwin', email : 'edwinfardyanto@gmail.com'},
      // ],
      subject: 'Request Autotrader',
      htmlContent: autotraderRequestTemplate({
        requestedAt : moment().format('ddd, DD MMM YYYY HH:mm:ss'),
        autotrader_name : body?.autotrader_name,
        exchange_thumbnail: body?.exchange_thumbnail,
        trading_plan_id:body?.trading_plan_id,
        tradeAmount:body?.tradeAmount,
        trading_plan_pairs:body?.trading_plan_pairs,
      }),
    
    };

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'post',
      body: JSON.stringify(emailBody),
      headers: {
        accept: 'application/json',
        // eslint-disable-next-line no-undef
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
