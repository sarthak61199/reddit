"use client";

import { signUp } from "@/actions/auth";
import { signUpSchema } from "@/schema/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const res = await signUp(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/sign-in");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Card classNames={{ base: "min-w-[24rem] p-4" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="font-semibold text-2xl">Sign Up</CardHeader>
        <CardBody className="space-y-4">
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                placeholder="Username"
                isInvalid={!!errors.username?.message}
                errorMessage={errors.username?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                placeholder="Email"
                isInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
                type="email"
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Password"
                type="password"
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Button className="w-full" type="submit" isLoading={isSubmitting}>
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
