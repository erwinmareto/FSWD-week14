"use client";

import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from 'cookies-next';


export default function Navbar({token}) {

  const router = useRouter();


  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" bg="#D8D9DA">
      <Box p="4">
        <Link href="/" size="md" color="#272829">
          <Heading
            size="md"
            color="#272829"
            _hover={{
              color: "#61677A",
            }}
          >
            Books
          </Heading>
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button bg="#61677A" onClick={() => router.push("/add")}>Add Book</Button>
        {token ? <Button onClick={e => {
          deleteCookie('token')
          router.push('/login')
          }}>Log Out</Button> : <Button onClick={() => router.push("/login")}>Log in</Button>}
        
      </ButtonGroup>
    </Flex>
  );
}
