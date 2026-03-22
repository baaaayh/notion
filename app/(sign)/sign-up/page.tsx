import NotionLogo from "@/components/ui/icons/NotionLogo";
import Divider from "@/components/sign/Divider";
import SignUpArea from "@/components/sign/SignUpArea";

export default function SignUpPage() {
  return (
    <div className="login-page flex w-full min-h-full justify-center">
      <div className="login-area inline-flex justify-center flex-col max-w-90 w-full">
        <div className="login-area__logo text-center mb-6">
          <h2 className="flex justify-center">
            <NotionLogo />
          </h2>
        </div>
        <div className="login-area__title">
          <p>
            <strong className="block text-[22px] font-semibold leading-6.5 text-black text-center">
              나만의 AI 워크스페이스
            </strong>
          </p>
          <p>
            <strong className="block text-[22px] font-semibold leading-6.5 text-grey text-center">
              Notion 계정 생성
            </strong>
          </p>
        </div>
        <Divider text="또는 다음으로 계속하기" />
        {/* Client Component */}
        <SignUpArea />
      </div>
    </div>
  );
}
