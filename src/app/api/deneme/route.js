export async function GET(req) {
  const deneme = process.env.DENEME_TEXT;
  try {
    return new Response(deneme, { status: 200 });
  } catch (error) {
    return new Response("basarısız", { status: 500 });
  }
}
