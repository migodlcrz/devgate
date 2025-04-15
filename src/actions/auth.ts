import client from "@/lib/db";
import { User } from "@/models/User";
import { saltAndHashPassword } from "@/utils/password";

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
