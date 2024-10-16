"use client";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
export default function ThemeProvider({children}) {
  return <NextThemesProvider>
    <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>;
}
