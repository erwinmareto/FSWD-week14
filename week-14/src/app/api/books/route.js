import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { Buffer } from "node:buffer";
import prisma from "@/app/lib/prisma";

export async function GET() {
  console.log('GETTTTTTTTTTTTT', "<<<<<<<<<<<<<<<<<<<<<<<");
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    throw new Error(error)
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");
  // console.log(formData.get('image'));
  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(
    __dirname,
    "../../../../../public/uploads",
    file.name
  );
  await writeFile(filePath, buffer);
//   console.log(`open ${filePath} to see the uploaded file`);

  try {
    const book = await prisma.book.create({
      data: {
        title: formData.get("title"),
        author: formData.get("author"),
        publisher: formData.get("publisher"),
        year: parseInt(formData.get("year")),
        pages: parseInt(formData.get("pages")),
        image: `uploads/${file.name}`,
      },
    });
    return NextResponse.json({ message: "Book Added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
