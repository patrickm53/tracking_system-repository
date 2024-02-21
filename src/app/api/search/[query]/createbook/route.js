import Book from "@/models/Book";
import connect from "@/lib/db";

export async function GET(req, ctx) {
  await connect();

  const query = ctx.params.query;

  try {
    let searchBooks = await Book.find({
      title: { $regex: query, $options: "i" },
    }).limit(3);

    if (searchBooks.length === 0) {
      searchBooks = "dont";
    }

    return new Response(JSON.stringify(searchBooks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
