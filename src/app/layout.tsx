import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Analytics Dashboard",
  description: "AI-powered analytics platform using Next.js + Express",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}


