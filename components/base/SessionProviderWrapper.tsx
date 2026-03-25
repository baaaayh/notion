"use client";

import { type PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type SessionProviderWrapperProps = PropsWithChildren<{
  session: Session | null;
}>;

export default function SessionProviderWrapper(
  props: SessionProviderWrapperProps,
) {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
}
