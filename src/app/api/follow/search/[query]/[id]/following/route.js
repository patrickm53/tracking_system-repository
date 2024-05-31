import connect from "@/lib/db";
import Follower from "@/models/Follower";

export async function GET(req, ctx) {
  await connect();

  const query = ctx.params.query;
  const userId = ctx.params.id;
  console.log(query, userId);

  try {
    const following = await Follower.findOne({ user: userId })
      .select("following")
      .populate({
        path: "following",
        select: "-password",
      });
    let followings = [];
    if (following.following) {
      const queryRegex = new RegExp(query, "i");
      followings = following.following.filter((user) =>
        queryRegex.test(user.username)
      );
    }

    return new Response(JSON.stringify(followings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
