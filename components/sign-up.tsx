"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
  Link,
} from "@heroui/react";
import React from "react";

function SignUp() {
  return (
    <Card classNames={{ base: "min-w-[24rem] p-4" }}>
      <form>
        <CardHeader className="font-semibold text-2xl">Sign Up</CardHeader>
        <CardBody className="space-y-4">
          <Input placeholder="Username" name="username" />
          <Input placeholder="Email" name="email" type="email" />
          <Input placeholder="Password" name="password" type="password" />
        </CardBody>
        <CardFooter>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </CardFooter>
        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-md">
            Sign In
          </Link>
        </p>
      </form>
    </Card>
  );
}

export default SignUp;
