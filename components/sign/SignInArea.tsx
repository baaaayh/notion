"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input/Input";
import ButtonDefault from "@/components/ui/buttons/ButtonDefault";
import { signIn, useSession } from "next-auth/react";

export default function SignInArea() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) router.replace("/");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <div className="login-area__input">
      <div className="login-area__row mt-1 mb-2">
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="이메일 주소를 입력하세요."
          isLabel={true}
          labelText="이메일"
          handleChange={handleChange}
        />
      </div>
      <div className="login-area__row mt-1 mb-2">
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          isLabel={false}
          labelText="비밀번호"
          handleChange={handleChange}
        />
      </div>
      <div className="login-area__row mt-4 mb-2">
        <ButtonDefault type="button" text="계속" onClick={handleSubmit} />
      </div>
    </div>
  );
}
