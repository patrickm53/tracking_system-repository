import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Book from "@/models/Book";

export async function GET(req, ctx) {
  await connect();

  const userId = ctx.params.id;

  try {
    const book = await Book.find({ user: userId }).select("-user.password");
    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
