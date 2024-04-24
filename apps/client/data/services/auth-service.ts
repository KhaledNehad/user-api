import { API_URL } from "@/lib/util/api";

interface RegisterUserProps {
  username: string;
  email: string;
  password: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = `${API_URL}/auth`;

export async function registerUserService(userData: RegisterUserProps) {
  try {
    const response = await fetch(`${baseUrl}/register`, {
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

export async function loginUseService(userData: LoginUserProps) {}
