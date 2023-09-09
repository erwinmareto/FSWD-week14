import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(req, { params }) {
  try {  
    const { id } = params;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ book });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export async function PUT(req, { params }) {
  try {
    const formData = await req.formData();
    const { id } = params;

    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title: formData.get("title"),
        author: formData.get("author"),
        publisher: formData.get("publisher"),
        year: parseInt(formData.get("year")),
        pages: parseInt(formData.get("pages")),
      },
    });
    return NextResponse.json(book)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export async function DELETE(req, {params}) {
    try {
        const {id} = params
        const book = await prisma.book.delete({
            where: { id: Number(id) },
          });
        return NextResponse.json({message: 'Book Deleted'})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Internal Server Error'})
    }
}