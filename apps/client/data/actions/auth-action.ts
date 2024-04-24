"use server";

import { z } from "zod";
import { registerUserService } from "@/data/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 70 * 70 * 6 * 6, // 6 hours
  path: "/",
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      ZodError: validatedFields.error.flatten().fieldErrors,
      data: null,
      message: "Missing Fields. Please fill in required fields",
    };
  }

  const response = await registerUserService(validatedFields.data);

  if (response.message) {
    return {
      ...prevState,
      data: null,
      ZodError: null,
      message: response,
    };
  }

  cookies().set("token", response.user.token, config);
  redirect("/dashboard");
}
