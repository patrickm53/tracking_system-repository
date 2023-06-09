import bcrypt from "bcrypt";
import User from "../../../models/User";
import connect from "@/lib/db";

export async function POST(req) {
  try {
    await connect();

    const { name, username, email, password: pass } = await req.json();

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const { password, ...user } = newUser._doc;

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
