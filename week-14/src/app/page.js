
import Book from "@/components/Book";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export default async function Home() {

  const books = await getData();
  return (
    <>
      {books?.map((book) => {
        return (
          <Link href={`/books/${book.id}`}>
            <Book book={book} />
          </Link>
        );
      })}
    </>
  );
}

async function getData() {
  try {
    const books = await prisma.book.findMany();
    return books
  } catch (error) {
    throw new Error(error)
  }
}

  
