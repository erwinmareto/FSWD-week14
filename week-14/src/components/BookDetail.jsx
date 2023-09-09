"use client";

import {
  Box,
  HStack,
  VStack,
  Center,
  Spacer,
  Container,
  Image,
  Text,
  Button,
  StackDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BookDetail({ book }) {
  const router = useRouter();
  const toast = useToast();

  async function handleDelete(id) {
    try {
        await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE'
        })
        toast({
            title: "Success",
            description: "Book Removed",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        router.push('/')
        
    } catch (error) {
        console.log(error);
        toast({
            title: "Failed",
            description: "Delete failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    }
  }

  return (
    <Container maxW="2xl" mt="5rem"  p='10'>
      <HStack divider={<StackDivider borderColor="gray.200" />}>
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "300px" }}
          src={`http://localhost:3000/${book.image}`}
          alt="Book Cover"
        />

        <Spacer />
        <VStack>
          <Text fontSize="3xl" px="2.5" py="2" color="white" as="b">
            {book.title}
          </Text>
          <Text fontSize="xl" px="2.5" py="2" color="white">
            {book.publisher}
          </Text>
          <Text fontSize="xl" px="2.5" py="2" color="white">
            {book.year}
          </Text>
          <Text fontSize="xl" px="2.5" py="2" color="white">
            {book.pages} Pages
          </Text>
          <Button
            onClick={(e) => {
              router.push(`/edit/${book.id}`);
            }}
          >
            Edit
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="solid" colorScheme="red" mb='10'>
                Delete
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg="red.400" border='0'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Are you sure about that?</PopoverBody>
                <PopoverFooter border="0">
                  <Button
                    colorScheme="red"
                    onClick={(e) => handleDelete(book.id)}
                  >
                    Delete
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </VStack>
      </HStack>
    </Container>
  );
}
