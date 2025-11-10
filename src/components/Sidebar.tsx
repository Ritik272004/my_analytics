"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Invoices", path: "/invoices" },
  { name: "Chat with Data", path: "/chat" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-8 text-blue-700">Flowbit AI</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`block px-4 py-2 rounded-md ${
              pathname === link.path
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
