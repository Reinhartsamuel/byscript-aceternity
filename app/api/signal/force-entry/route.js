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
