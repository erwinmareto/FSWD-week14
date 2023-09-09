import BookForm from "@/components/BookForm"
import prisma from "@/app/lib/prisma"

export default async function EditBook({params}) {
    const {id} = params
    const book = await getData(id)
    // console.log(book, "<<<<<<<<<<<<<<<");
    return (
        <BookForm edit={true} id={id} book={book}></BookForm>
    )   
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



// try {
//   const res = await fetch(`http://localhost:3000/api/books/${id}`, {
//     next: { revalidate: 10 },
//   });
//   const data = await res.json();
//   return data;
// } catch (error) {
//   console.log(error);
// }
  
