import connect from "@/lib/db";
import BookComment from "@/models/BookComment";

export async function POST(req) {
  try {
    await connect();

    const formData = await req.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      fields[key] = value;
    }
    const { rating, description, user, book } = fields;

    const newBookComment = await BookComment.create({
      rating,
      description,
      user,
      book,
    });

    return new Response(JSON.stringify("başarılı"), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
