"use server";

import { signJWT } from "@/features/auth/jwt";
import {
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from "@/features/auth/schema";
import { prisma } from "@/lib/prisma";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(unsafeData: SignInInput) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid values" };
  }

  const { emailOrUsername, password } = data;

  const cookieStore = await cookies();

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      avatar: true,
    },
  });

  if (!user) {
    return { error: true, message: "Invalid credentials" };
  }

  const isValidPassword = await verify(user.password, password);

  if (!isValidPassword) {
    return { error: true, message: "Invalid credentials" };
  }

  const token = signJWT(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar || null,
    },
    { expiresIn: "7d" }
  );

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  redirect("/");
}

export async function signUp(unsafeData: SignUpInput) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid values" };
  }

  const { username, email, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return { error: true, message: "User already exists" };
  }

  const hashedPassword = await hash(password);

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
    },
  });

  redirect("/sign-in");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");

  redirect("/sign-in");
}
