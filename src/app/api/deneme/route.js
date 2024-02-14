export async function GET(req) {
  try {
    return new Response("succces", { status: 200 });
  } catch (error) {
    return new Response("basarısız", { status: 500 });
  }
}
