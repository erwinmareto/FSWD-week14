import BookDetail from "@/components/BookDetail";
import prisma from "@/app/lib/prisma";

export default async function bookDetailPage({ params }) {
  const { id } = params;
  const book = await getData(id);
  // console.log(book, "PUTTTTTTTTTTTTTTT");
  return <BookDetail book={book}></BookDetail>;
}

export async function getData(id) {
  try {
    // cookies().delete('token')
    // console.log(cookies().get('token'));
    
    // const { id } = params;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return book
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}
