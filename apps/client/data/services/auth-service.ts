import { getServerURL } from "@/lib/utils";

interface RegisterUserProps {
  username: string;
  email: string;
  password: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

const baseUrl = getServerURL();

export async function registerUserService(userData: RegisterUserProps) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    return await response.json();
  } catch (error) {
    return {
      message: "An error occurred. Please try again later",
    };
  }
}

export async function loginUseService(userData: LoginUserProps) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    return await response.json();
  } catch (error) {
    return {
      message: "An error occurred. Please try again later",
    };
  }
}
