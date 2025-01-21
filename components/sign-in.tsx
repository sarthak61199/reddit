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

function SignIn() {
  return (
    <Card classNames={{ base: "min-w-[24rem] p-4" }}>
      <form>
        <CardHeader className="font-semibold text-2xl">Sign In</CardHeader>
        <CardBody className="space-y-4">
          <Input placeholder="Email or Username" name="email" />
          <Input placeholder="Password" name="password" type="password" />
        </CardBody>
        <CardFooter>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </CardFooter>
        <p className="text-sm text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-md">
            Sign Up
          </Link>
        </p>
      </form>
    </Card>
  );
}

export default SignIn;
