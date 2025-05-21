"use server";

import { signIn } from "@/auth";
import client from "@/lib/db";
import { User } from "@/models/User";
import { saltAndHashPassword } from "@/utils/password";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/home",
  };

  if (!rawFormData.email || !rawFormData.password) {
    return { error: "All fields are required!" };
  }

  try {
    await signIn("credentials", rawFormData);
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const registerWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/home/dashboard",
  };

  if (!rawFormData.email || !rawFormData.password) {
    return { error: "All fields are required!" };
  }

  try {
    await client.connect();

    const existingUser = await User.findOne({ email: rawFormData.email });

    if (existingUser) {
      return { error: "User already exists." };
    }

    const hashedPassword = saltAndHashPassword(rawFormData.password as string);

    const newUser = await User.create({
      email: rawFormData.email,
      hashedPassword,
    });

    console.log("NEW USER: ", newUser);

    return { error: "User registered. Please login." };
  } catch (error) {
    return { error: "Something went wrong during registration." };
  }
};
