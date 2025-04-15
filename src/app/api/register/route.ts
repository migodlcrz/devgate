import client from "@/lib/db";
import { User } from "@/models/User";
import { saltAndHashPassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    await client.connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = saltAndHashPassword(password);

    const newUser = await User.create({
      email,
      hashedPassword,
    });

    console.log("NEW USER: ", newUser);

    return NextResponse.json(
      { message: "User registered. Please login." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    return NextResponse.json(
      { error: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
