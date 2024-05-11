import connect from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Book from "@/models/Book";
import BookComment from "@/models/BookComment";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  const saveFileName = fileName.replace(/\s+/g, "").toLowerCase();
  const key = `${saveFileName}-${Date.now()}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `book/${key}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return key;
}

export async function GET(req) {
  await connect();

  try {
    const books = await Book.find({});
    const lastBook = [];
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
      }
      book.user = bookComments[0].user;
      const responseBook = {
        ...book._doc,
        rating: averageRating,
        description: bookComments[0].description,
      };
      lastBook.push(responseBook);
    }
    console.log(lastBook);

    return new Response(JSON.stringify(lastBook), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connect();

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
    const formData = await req.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      fields[key] = value;
    }
    const {
      title,
      author,
      genres,
      pages,
      years,
      language,
      croppedImage,
      user,
    } = fields;

    let imageName = "";

    if (croppedImage !== null && croppedImage && croppedImage !== "null") {
      const buffer = Buffer.from(await croppedImage.arrayBuffer());
      imageName = await uploadFileToS3(buffer, title);
    }

    const newBook = await Book.create({
      title,
      author,
      genres,
      pages,
      years,
      language,
      bookImage: imageName,
      user,
    });

    const { _id } = newBook;

    return new Response(JSON.stringify(_id), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
