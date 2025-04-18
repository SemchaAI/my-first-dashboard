"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { KeyRound, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { signInSchema, type SignInSchema } from "@/utils/config";
import { InputField } from "@/components/features";

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });
  const submitHandler = async (data: SignInSchema) => {
    try {
      console.log("SigInForm", data);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!response?.ok) {
        form.setError("email", {
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.log("[SigInForm]", error);
    }
  };

  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && data) {
      router.replace(`/${data.user.role.toLowerCase()}`);
    }
  }, [data, router, status]);

  return (
    <Form form={form} onSubmit={submitHandler}>
      {
        // inputs
        <>
          <InputField id="email" label="Email" type="text" Icon={Mail} />
          <InputField
            id="password"
            label="Password"
            type="password"
            Icon={KeyRound}
          />
        </>
      }
      {
        // formControls
        <div>
          <button type="submit">Click</button>
        </div>
      }
    </Form>
  );
};
