import connect from "@/lib/db";
import BookComment from "@/models/BookComment";
import Follower from "@/models/Follower";

export async function GET(req, ctx) {
  await connect();

  const userId = ctx.params.id;

  try {
    const commentCount = await BookComment.countDocuments({ user: userId });
    const follower = await Follower.findOne({ user: userId });
    const lastData = {
      commentCount: commentCount,
      followers: follower.followers.length,
      following: follower.following.length,
    };
    return new Response(JSON.stringify(lastData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
