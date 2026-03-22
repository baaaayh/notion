export function validateForm(form: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}) {
  const { email, password, passwordConfirm, name } = form;

  if (!email || !password || !passwordConfirm || !name) {
    throw new Error("모든 값을 입력해주세요.");
  }

  if (!email.includes("@")) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }

  if (password.length < 6) {
    throw new Error("비밀번호는 6자 이상이어야 합니다.");
  }

  if (password !== passwordConfirm) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
}
