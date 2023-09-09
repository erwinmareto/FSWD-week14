"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Container,
  Center,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BookForm({ edit, book }) {
  const toast = useToast();
  const router = useRouter();

  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (edit) {
      try {
        await fetch(`http://localhost:3000/api/books/${book.id}`, {
          method: "PUT",
          body: formData,
        });
        toast({
          title: "Success",
          description: "Book Edited",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        router.push("/");
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed",
          description: "Book Not Added",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Success",
        description: "Book Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      e.target.reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: "Book Not Added",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <Container
      maxW="container.sm"
      p="3rem"
      mt="2rem"
      bg="#61677A"
      borderRadius="10"
      centerContent
      gap="5"
    >
      <Center>
        <Text fontSize="4xl">{edit ? "Edit Book" : "Add Book"}</Text>
      </Center>
      <form
        onSubmit={(e) => {
          handleAdd(e);
        }}
      >
        <FormControl mt="3">
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" defaultValue={book?.title} />
          <FormLabel>Author</FormLabel>
          <Input type="text" name="author" defaultValue={book?.author} />
          <FormLabel>Publisher</FormLabel>
          <Input type="text" name="publisher" defaultValue={book?.publisher} />
          <FormLabel>Year</FormLabel>
          <Input type="number" name="year" defaultValue={book?.year} />
          <FormLabel>Pages</FormLabel>
          <Input type="number" name="pages" defaultValue={book?.pages} />
          {!edit && (
            <>
              <FormLabel>Image</FormLabel>
              <Input name="image" type="file" />
            </>
          )}

          <Center>
            <Button type="submit" m="3">
              Submit
            </Button>
          </Center>
        </FormControl>
      </form>
    </Container>
  );
}
