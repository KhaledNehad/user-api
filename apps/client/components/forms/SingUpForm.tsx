"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/data/actions/auth-action";
import { ZodErrors } from "@/components/custom/ZodErrors";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ServerErrors } from "@/components/custom/ServerErrors";
import { SubmitButton } from "@/components/custom/SubmitButton";

const INITIAL_STATE = {
  data: null,
  ZodError: null,
  message: null,
  // serverError: null,
};

function SingUpForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  return (
    <div>
      <div className="w-full max-w-md">
        <form action={formAction}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                />
                <ZodErrors error={formState?.ZodError?.username} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
                <ZodErrors error={formState?.ZodError?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <ZodErrors error={formState?.ZodError?.password} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton
                className="w-full"
                text="Sign Up"
                loadingText="Loading"
              />
              <ServerErrors error={formState?.message} />
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Have an account?
            <Link className="underline ml-2" href="signin">
              Sing In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingUpForm;
