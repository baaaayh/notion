export async function signUp(params: {
  email: string;
  name: string;
  password: string;
}) {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입에 실패했습니다.");
  }

  return response.json();
}

export type UpdatePageParams = Partial<{
  title: string;
  icon: string;
  cover_img: string;
  isPublished: boolean;
}>;

export async function updatePage(id: string, params: UpdatePageParams) {
  const response = await fetch("/api/pages", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...params }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "업데이트 실패");
  }

  return response.json();
}
