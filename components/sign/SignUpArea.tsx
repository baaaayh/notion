"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input/Input";
import ButtonDefault from "@/components/ui/buttons/ButtonDefault";
import { validateForm } from "@/lib/validateForm";
import { signUp } from "@/lib/apiManager";

export default function SignUpArea() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { email, name, password } = form;
    try {
      validateForm({ ...form });
      const res = await signUp({ email, name, password });
      if (res.ok) router.replace("/sign-in");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <div className="signup-area__input">
      <div className="login-area__row mt-1 mb-2">
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="이름을 입력하세요."
          isLabel={true}
          labelText="이름"
          handleChange={handleChange}
        />
      </div>
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
      <div className="signup-area__row mt-1 mb-2">
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
      <div className="signup-area__row mt-1 mb-2">
        <Input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="비밀번호를 재입력하세요."
          isLabel={false}
          labelText="비밀번호 확인"
          handleChange={handleChange}
        />
      </div>
      <div className="signup-area__row mt-4 mb-2">
        <ButtonDefault type="button" text="계정 생성" onClick={handleSubmit} />
      </div>
    </div>
  );
}
