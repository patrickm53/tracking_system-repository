import Book from "@/models/Book";
import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";

export async function PUT(req, ctx) {
  await connect();

  const id = ctx.params.id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const book = await Book.findById(id);

    if (book.likes.includes(decodedToken._id)) {
      book.likes = book.likes.filter(
        (id) => id.toString() !== decodedToken._id.toString()
      );
    } else {
      book.likes.push(decodedToken._id);
    }

    await book.save();

    return new Response(
      JSON.stringify({ msg: "Successfully interacted with the blog" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
