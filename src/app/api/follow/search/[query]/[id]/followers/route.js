import connect from "@/lib/db";
import Follower from "@/models/Follower";

export async function GET(req, ctx) {
  await connect();

  const query = ctx.params.query;
  const userId = ctx.params.id;
  console.log(query, userId);

  try {
    const follower = await Follower.findOne({ user: userId })
      .select("followers")
      .populate({
        path: "followers",
        select: "-password",
      });
    const queryRegex = new RegExp(query, "i");
    const followers = follower.followers.filter((user) =>
      queryRegex.test(user.username)
    );

    return new Response(JSON.stringify(followers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
