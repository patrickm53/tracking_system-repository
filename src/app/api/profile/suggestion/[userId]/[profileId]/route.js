import connect from "@/lib/db";
import Follower from "@/models/Follower";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req, ctx) {
  await connect();
  const { userId, profileId } = ctx.params;

  if (!userId && !profileId) {
    return new Response(JSON.stringify({ error: "id bug" }), { status: 403 });
  }

  try {
    const followAll = await Follower.findOne({ user: userId }).select(
      "following"
    );
    const followingIds = followAll
      ? followAll.following.map((f) => f.toString())
      : [];
    followingIds.push(userId.toString(), profileId.toString());
    console.log(followingIds);

    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: followingIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      { $sample: { size: 4 } },
    ]);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
