import connect from "@/lib/db";
import Follower from "@/models/Follower";

export async function GET(req, ctx) {
  await connect();

  const userId = ctx.params.id;

  try {
    const follower = await Follower.findOne({ user: userId })
      .select("following")
      .populate({
        path: "following",
        select: "-password",
      });

    return new Response(JSON.stringify(follower), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
