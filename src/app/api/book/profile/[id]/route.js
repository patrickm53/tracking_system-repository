import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Book from "@/models/Book";

export async function GET(req, ctx) {
  await connect();

  const userId = ctx.params.id;

  try {
    let book = await Book.find({ user: userId }).select("-user.password");
    if (book.length === 0) {
      book = "dont";
    }
    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
