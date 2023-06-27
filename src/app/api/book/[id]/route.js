import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Book from "@/models/Book";

export async function GET(req, ctx) {
  await connect();

  const id = ctx.params.id;

  try {
    const book = await Book.findById(id).populate("user").select("-password");

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

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
    const body = await req.json();
    const book = await Book.findById(id).populate("user");

    if (book?.user?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can update his book" }),
        { status: 403 }
      );
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    return new Response(JSON.stringify(updatedBook), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
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
    const book = await Book.findById(id).populate("user");
    if (book?.user?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ msg: "Only author can delete his book" }),
        { status: 403 }
      );
    }

    await Book.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Successfully deleted book" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
