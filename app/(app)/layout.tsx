import { env } from "@/lib/env.server";
import Script from "next/script";
import React from "react";



export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  );
}
