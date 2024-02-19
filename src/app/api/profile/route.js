import connect from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await connect();

  try {
    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
