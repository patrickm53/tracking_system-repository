import connect from "@/lib/db";
import Follower from "@/models/Follower";

export async function GET(req, ctx) {
  await connect();

  const {id, meId} = ctx.params;
  const userId = id;

  try {
    const meFollow = await Follower.findOne({ user: meId });
    const meFollowing = meFollow.following;
    const follower = await Follower.findOne({ user: userId })
      .select("following")
      .populate({
        path: "following",
        select: "-password",
      });

      const followingList = follower.following;
      const updatedFollowing = followingList.map(following => {
        const isFollowing = meFollowing.includes(following._id.toString());
        const me = following._id.toString() === meId;
        return {
          ...following.toObject(),
          follow: me ? "me" : isFollowing ? true : false,
        };
      });

      const sortedFollowing = updatedFollowing.sort((a, b) => {
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
