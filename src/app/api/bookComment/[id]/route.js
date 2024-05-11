import connect from "@/lib/db";
import BookComment from "@/models/BookComment";

export async function GET(req, ctx) {
  await connect();

  const id = ctx.params.id;

  try {
    const books = await BookComment.find({ book: id })
      .sort({
        likes: -1,
        createdAt: 1,
      })
      .populate("user")
      .limit(3);

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
