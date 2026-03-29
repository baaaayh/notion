import SafePageSlider from "@/components/page/SafePageSlider";

export default function Home() {
  return (
    <div className="view h-full">
      <div className="home page-home">
        <div className="home-head col-[content-start/content-end] py-10">
          <h2 className="text-center text-[30px] font-bold">안녕하세요.</h2>
        </div>
        <div className="page-list col-[content-start/content-end]">
          <SafePageSlider />
        </div>
      </div>
    </div>
  );
}
