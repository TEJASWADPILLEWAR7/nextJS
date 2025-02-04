import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("Extracted token from cookies:", token);

    if (!token) {
      throw new Error("No token found in cookies");
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log("Decoded token:", decodedToken);

    return decodedToken.id;
  } catch (error: any) {
    console.log("Token verification failed:", error.message);
    throw new Error("Invalid or expired token");
  }
};
