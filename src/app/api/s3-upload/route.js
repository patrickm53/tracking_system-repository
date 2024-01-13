import connect from "@/lib/db";
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

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `myfolder/${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(req) {
  await connect();

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    console.log(file);

    if (!file) {
      return new Response(
        JSON.stringify({ msg: "file is req" }, { status: 500 })
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return new Response(
      JSON.stringify({ success: true, fileName }, { status: 500 })
    );
  } catch (error) {
    return new Response(JSON.stringify({ msg: "error" }, { status: 500 }));
  }
}
