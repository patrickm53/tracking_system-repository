import connect from "@/lib/db";
import User from "@/models/User";

export async function GET(req, ctx) {
  await connect();
  const { userId, profileId } = ctx.params;

  if (!userId && !profileId) {
    return new Response(JSON.stringify({ error: "id bug" }), { status: 403 });
  }

  try {
    const users = await User.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          userId: 0,
          profileId: 0,
        },
      },
    ]);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
