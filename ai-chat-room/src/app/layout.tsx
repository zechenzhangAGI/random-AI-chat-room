import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat Room - Experience the Future of Conversation",
  description: "Chat with diverse AI personalities in 1-on-1 conversations or join group rooms. Experience unique characters with distinct backgrounds, personalities, and conversation styles.",
  keywords: "AI chat, artificial intelligence, chatbot, conversation, virtual personalities, group chat",
  authors: [{ name: "AI Chat Room" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",
  openGraph: {
    title: "AI Chat Room - Chat with AI Personalities",
    description: "Meet diverse AI characters with unique personalities and backgrounds. Experience the future of conversation.",
    type: "website",
    url: "https://ai-chat-room.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Chat Room - Experience the Future of Conversation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat Room - Chat with AI Personalities",
    description: "Meet diverse AI characters with unique personalities and backgrounds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
