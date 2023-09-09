"use client";

import {
  Container,
  Stack,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  async function handleLogin(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: formData,
      });
      const data = await res.json()

      toast({
        title: 'Success',
        description: 'User logged in',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      router.push('/')
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed',
        description: "Invalid email or password",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: formData,
          });
        const data = await res.json()
          toast({
            title: 'Success',
            description: 'User Created',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        e.target.reset()
    } catch (error) {
        console.log(error);
        toast({
            title: 'Failed',
            description: "Please try again.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
    }
  }

  return (
    <Container
      maxW="md"
      p="3rem"
      mt="5rem"
      bg="#61677A"
      borderRadius="10"
      centerContent
    >
      <Stack>
        <Center>
          <Text fontSize="3xl">Welcome!</Text>
        </Center>
        <Center>
          <Text fontSize="xl">Please fill in the field below</Text>
        </Center>
      </Stack>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <FormControl mt="3">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />

          <Center>
            <Button type="submit" m="3">
              Log In
            </Button>
          </Center>
        </FormControl>
      </form>
      <Text>
        Don't have an account?{" "}
        <Button onClick={onOpen} variant="link" color="#FFF6E0">
          Register
        </Button>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#61677A">
          <ModalHeader>Create an Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => {handleRegister(e)}}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                //   onChange={(e) => setName(e.target.value)}
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                //   onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                //   onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  mt={4}
                  type="submit"
                //   onClick={handleRegister}
                >
                  Register
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
