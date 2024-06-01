import connect from "@/lib/db";
import Follower from "@/models/Follower";
import { getSession } from "next-auth/react";

export async function GET(req, ctx) {
  await connect();

  const { id, meId } = ctx.params;
  const userId = id

  try {
    const meFollow = await Follower.findOne({ user: meId })
    const meFollowing = meFollow.following
    const followers = await Follower.findOne({ user: userId })
      .select("followers")
      .populate({
        path: "followers",
        select: "-password",
      });

      const followersList = followers.followers
      const updatedFollowers = followersList.map(follower => {
        const isFollowing = meFollowing.includes(follower._id.toString());
        const me = follower._id.toString() === meId;
        return {
          ...follower.toObject(),
          follow: me ? "me" : isFollowing ? true : false
        };
      });

      const sortedFollowing = updatedFollowers.sort((a, b) => {
        if (a.follow === "me") return -1;
        if (b.follow === "me") return 1;
        if (a.follow === true && b.follow !== "me") return -1;
        if (b.follow === true && a.follow !== "me") return 1;
        return 0; // Eğer ikisi de true veya false ise mevcut sıralamayı korur
      });
    return new Response(JSON.stringify(sortedFollowing), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
