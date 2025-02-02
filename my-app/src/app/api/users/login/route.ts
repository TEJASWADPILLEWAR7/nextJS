import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", {
        status: 404,
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return new Response("Invalid password", {
        status: 400,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true, path: "/" });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
