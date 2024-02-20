import bcrypt from "bcrypt";
import User from "@/models/User";
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
  const key = `${fileName}-${Date.now()}`;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `profileImage/${key}`,
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
    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connect();
    const formData = await req.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      fields[key] = value;
    }
    const {
      name,
      username,
      email,
      password: pass,
      location,
      website,
      birthday,
      word,
      story,
      selectedImage,
    } = fields;

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    let imageName = "";

    if (selectedImage) {
      const buffer = Buffer.from(await selectedImage.arrayBuffer());
      imageName = await uploadFileToS3(buffer, selectedImage.name);
    }

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      location,
      website,
      birthday,
      word,
      story,
      profilImage: imageName,
    });

    const { password, ...user } = newUser._doc;

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connect();
    const formData = await req.formData();
    const fields = {};
    for (const [key, value] of formData.entries()) {
      fields[key] = value;
    }
    const {
      name,
      username,
      email,
      location,
      website,
      birthday,
      word,
      story,
      newProfilImage,
    } = fields;

    const isExisting = await User.findOne({ email });

    if (!isExisting) {
      throw new Error("User not exists");
    }
    let imageName = "";
    if (newProfilImage.name) {
      const buffer = Buffer.from(await newProfilImage.arrayBuffer());
      imageName = await uploadFileToS3(buffer, newProfilImage.name);
    } else {
      imageName = isExisting?.profilImage;
    }

    const newUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        username,
        location,
        website,
        birthday,
        word,
        story,
        profilImage: imageName,
      },
      { new: true }
    );
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
