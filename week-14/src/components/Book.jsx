"use client";

import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Text,
    Image,
  } from "@chakra-ui/react";

export default function Book({ book }) {
  
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="elevated"
      m="5px"
      size='sm'
      bg="#272829"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={`http://localhost:3000/${book.image}`}
        alt="Book Cover"
      />

      <Stack>
        <CardBody key={book.id}>
          <Heading px='2.5' size="md" color="white">
            {book.title}
          </Heading>

          <Text px='2.5' py="2" color="white">
            {book.author}
          </Text>
          <Text px='2.5' py="2" color="white">
            {book.publisher}
          </Text>
          <Text px='2.5' py="2" color="white">
            {book.year}
          </Text>
          <Text px='2.5' py="2" color="white">
            {book.pages} Pages
          </Text>
        </CardBody>

        <CardFooter>

          
          

        </CardFooter>
      </Stack>
    </Card>
  );
}
