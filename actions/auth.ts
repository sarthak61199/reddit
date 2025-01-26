"use server";

import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/schema/auth";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { signJWT } from "@/lib/jwt";
import { z } from "zod";

export async function signIn(data: z.infer<typeof signInSchema>) {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid inputs");
  }

  const { emailOrUsername, password } = result.data;

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
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await verify(user.password, password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  // Create JWT token
  const token = signJWT(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar || null,
    },
    { expiresIn: "7d" }
  );

  // Set cookie
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { success: true, message: "Signed in successfully" };
}

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid inputs");
  }

  const cookieStore = await cookies();

  const { username, email, password } = result.data;

  // Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw new Error("Username or email already taken");
  }

  // Create user
  const hashedPassword = await hash(password);

  const user = await prisma.user.create({
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

  // Create JWT token
  const token = signJWT(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    },
    { expiresIn: "7d" }
  );

  // Set cookie
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { success: true, message: "Signed up successfully" };
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");

    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Sign out error:", error);
    return { error: "Something went wrong" };
  }
}
