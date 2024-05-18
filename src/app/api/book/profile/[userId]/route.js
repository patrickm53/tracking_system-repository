import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Book from "@/models/Book";
import BookComment from "@/models/BookComment";

export async function GET(req, ctx) {
  await connect();

  const userId = ctx.params.userId;

  try {
    const book = await BookComment.find({ user: userId })
      .select("-user.password")
      .populate("book user");

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
