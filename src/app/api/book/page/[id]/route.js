import Book from "@/models/Book";
import connect from "@/lib/db";
import BookComment from "@/models/BookComment";

export async function GET(req, ctx) {
  // Sayfa sayısını url'den alıyoruz. Eğer url'de sayfa numarası yoksa 1. sayfayı gösterir.
  const page = ctx.params.id ? parseInt(ctx.params.id) : 1;

  // Bir sayfada kaç adet kitap gösterileceğini belirliyoruz.
  const perPage = 6;

  await connect();

  try {
    const lastBook = [];
    // Toplam kitap sayısını alıyoruz.
    const totalCount = await Book.countDocuments();

    // Toplam kitap sayısına göre oluşacak sayfa sayısını hesaplıyoruz.
    const totalPages = Math.ceil(totalCount / perPage);

    // skip: Sorgudan önce kaç kitap atlanacağını belirler.
    // (page - 1) * perPage -> page = 1 için 0, page = 2 için 6, page = 3 için 12, kitap atlanır.
    // limit: Sorgudan kaç kitap alınacağını belirler.
    const books = await Book.find({})
      .populate("user")
      .skip((page - 1) * perPage)
      .limit(perPage);

    for (const book of books) {
      const bookComments = await BookComment.find({ book: book._id })
        .sort({
          likes: -1,
        })
        .populate("user");

      let averageRating = 0;
      if (bookComments.length > 0) {
        const totalRating = bookComments.reduce(
          (acc, comment) => acc + comment.rating,
          0
        );
        averageRating = totalRating / bookComments.length;
        averageRating = averageRating.toFixed(1);
      }
      book.user = bookComments[0].user;
      const responseBook = {
        ...book._doc,
        rating: averageRating,
        description: bookComments[0].description,
      };
      lastBook.push(responseBook);
    }

    return new Response(
      JSON.stringify({
        books: lastBook,
        totalPages,
        currentPage: page,
        perPage,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
