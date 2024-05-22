import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Follower from "@/models/Follower";

export async function POST(req, ctx) {
  await connect();

  const { userId, followId } = ctx.params;
  const { action } = await req.json();
  console.log("action", action);

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  if (!userId && !followId) {
    return new Response(JSON.stringify({ error: "id bug" }), { status: 403 });
  }

  try {
    if (action === "follow") {
      await Follower.findOneAndUpdate(
        { user: userId },
        {
          $addToSet: { following: followId },
        }
      );
      await Follower.findOneAndUpdate(
        { user: followId },
        {
          $addToSet: { followers: userId },
        }
      );
      return new Response(
        JSON.stringify({ msg: "Successfully interacted with the blog" }),
        { status: 200 }
      );
    } else if (action === "unfollow") {
      await Follower.findOneAndUpdate(
        { user: userId },
        {
          $pull: { following: followId },
        }
      );
      await Follower.findOneAndUpdate(
        { user: followId },
        {
          $pull: { followers: userId },
        }
      );
      return new Response(
        JSON.stringify({ msg: "Successfully unfollowed the user" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(req, ctx) {
  await connect();

  const { userId, followId } = ctx.params;

  try {
    const followers = await Follower.findOne({ user: userId });
    const isFollowing = followers.following.includes(followId);
    if (!isFollowing) {
      return new Response(JSON.stringify(false), { status: 200 });
    } else {
      return new Response(JSON.stringify(true), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
