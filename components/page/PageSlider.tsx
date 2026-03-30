"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import SlideItem from "@/components/page/SlideItem";
import SwiperNavButton from "@/components/page/SwiperNavButton";
import { PageType } from "@/database/schema";
import "swiper/css";

export default function PageSlider() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name;

  const { data: pages } = useQuery<PageType[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/pages?userId=${userId}`);
      if (!res.ok) throw new Error("fetch failed");
      return res.json();
    },
    enabled: !!userId,
  });

  return (
    <div className="page-slider relative">
      <SwiperNavButton direction="left" className="swiper-nav-prev" />
      <SwiperNavButton direction="right" className="swiper-nav-next" />
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-nav-next",
          prevEl: ".swiper-nav-prev",
        }}
        spaceBetween={20}
        slidesPerView={5.5}
      >
        {pages?.map((page) => (
          <SwiperSlide key={page.id}>
            <SlideItem userName={userName} page={page} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
