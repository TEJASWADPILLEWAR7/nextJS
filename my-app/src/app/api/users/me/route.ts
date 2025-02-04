import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels.js";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("Incoming request to /api/users/me");

    // Extract token
    const userId = await getDataFromToken(request);
    console.log("Extracted userId from token:", userId);

    if (!userId) {
      console.log("Error: Token invalid or missing");
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Fetch user from database
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      console.log("Error: User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.log("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
