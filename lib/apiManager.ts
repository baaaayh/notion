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
  icon: string | null;
  cover_img: string | null;
  cover_alt: string | null;
  is_trash: boolean;
  trashed_at: Date | null;
  is_deleted: boolean;
  deleted_at: Date | null;
}>;

export async function updatePage(id: string, params: UpdatePageParams) {
  const response = await fetch(`/api/page/${id}`, {
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

export async function deletePage(id: string) {
  const response = await fetch(`/api/page/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.messge || "페이지 삭제 실패");
  }

  return response.json();
}

export async function getCoversData() {
  const response = await fetch("/api/covers");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "업데이트 실패");
  }

  return response.json();
}

export async function getTrashedPages(userId: string | undefined) {
  const response = await fetch(`/api/trash?userId=${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "휴지통 페이지를 불러오지 못했습니다.");
  }

  return response.json();
}
