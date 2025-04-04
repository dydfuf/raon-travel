"use client";

import {
  HomeIcon,
  MessageSquareIcon,
  PlaneIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = [
  {
    label: "홈",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "채팅",
    href: "/chat",
    icon: <MessageSquareIcon />,
  },
  {
    label: "여행",
    href: "/travel",
    icon: <PlaneIcon />,
  },
  {
    label: "더보기",
    href: "/more",
    icon: <MoreHorizontalIcon />,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-background border-t border-t-accent">
      <div className="flex items-center justify-evenly py-2">
        {MenuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link href={item.href} key={item.label} className="w-full">
              <div
                className={`flex flex-col items-center justify-center ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground opacity-50"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
