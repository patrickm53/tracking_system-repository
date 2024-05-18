import Book from "@/models/Book";
import connect from "@/lib/db";
import BookComment from "@/models/BookComment";

export async function GET(req, ctx) {
  const {
    params: { userId, pageId },
  } = ctx;

  // Sayfa numarasını alıyoruz. Eğer sayfa numarası belirtilmemişse 1. sayfa varsayılır.
  const page = pageId ? parseInt(pageId) : 1;

  // Her sayfada kaç kitap gösterileceğini belirliyoruz.
  const perPage = 3;

  await connect();

  try {
    // Kullanıcıya ait toplam kitap sayısını alıyoruz.
    const totalCount = await Book.countDocuments({ user: userId });

    // Toplam kitap sayısına göre oluşacak sayfa sayısını hesaplıyoruz.
    const totalPages = Math.ceil(totalCount / perPage);

    // skip: Sorgudan önce kaç kitap atlanacağını belirler.
    // (page - 1) * perPage -> page = 1 için 0, page = 2 için 3, page = 3 için 9, kitap atlanır.
    // limit: Sorgudan kaç kitap alınacağını belirler.
    const books = await BookComment.find({ user: userId })
      .select("-user.password")
      .populate("user book")
      .skip((page - 1) * perPage)
      .limit(perPage);

    return new Response(
      JSON.stringify({ books, totalPages, currentPage: page, perPage }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
