"use client";

import dynamic from "next/dynamic";

const PageSlider = dynamic(() => import("./PageSlider"), {
  ssr: false,
});

export default function SafePageSlider() {
  return <PageSlider />;
}
