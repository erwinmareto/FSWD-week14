import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import prisma from "@/app/lib/prisma";

export async function POST(req) {
  try {
    // console.log(req, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw {name: "Invalid Credentials'", message: "Invalid Credentials'"}
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw {name: "Invalid Credentials'", message: "Invalid Credentials'"}
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    // Set token in cookies
    cookies().set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24 * 7
  })

    // const cookieStore = cookies()
    // const allCookie = cookieStore.has('token');
    // console.log(allCookie, '<<<<<<<<<<<<<<<<<<');

    return NextResponse.json({ token });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}
