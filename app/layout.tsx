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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "jon.dev — Writing, projects, and work in progress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.domain,
    description: site.description,
    images: ["/og.png"],
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
