"use client";

import { signInSchema } from "@/schema/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const res = await signIn(data);

      if (res.success) {
        toast.success(res.message);
        router.push("/");
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
        <CardHeader className="font-semibold text-2xl">Sign In</CardHeader>
        <CardBody className="space-y-4">
          <Controller
            name="emailOrUsername"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Email or Username"
                errorMessage={errors?.emailOrUsername?.message}
                isInvalid={!!errors?.emailOrUsername?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Password"
                type="password"
                errorMessage={errors?.password?.message}
                isInvalid={!!errors?.password?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Button className="w-full" type="submit" isLoading={isSubmitting}>
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
