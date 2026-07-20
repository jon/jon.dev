import type { Metadata } from "next";
import "./globals.css";
import { site } from "../content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://jon.dev"),
  title: {
    default: site.domain,
    template: `%s — ${site.domain}`,
  },
  description: site.description,
  applicationName: site.domain,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.domain,
    title: site.domain,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: site.domain,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
