import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import prisma from "@/app/lib/prisma";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const hashedPassword = await bcrypt.hash(formData.get('password'), 10);
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name: formData.get('name'),
        email: formData.get('email'),
        password: hashedPassword,
      },
    });
    return NextResponse.json({message: 'User Created'})
  } catch (error) {
    // console.log(error);
    throw new Error(error)
  }
}
