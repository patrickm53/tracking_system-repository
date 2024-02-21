import User from "@/models/User";
import connect from "@/lib/db";

export async function GET(req, ctx) {
  await connect();
  const query = ctx.params.query;

  try {
    let searchUser = await User.find({
      username: { $regex: query, $options: "i" },
    }).limit(6);

    if (searchUser.length === 0) {
      searchUser = "dont";
    }

    return new Response(JSON.stringify(searchUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
