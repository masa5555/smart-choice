import { Replace, Scale, Tag } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

export default function Page() {
  const headerMenus: Array<{
    icon?: React.ReactNode;
    label: string;
    href: Route;
  }> = [
    {
      icon: <Tag className="text-white" />,
      label: "製品カテゴリから選ぶ",
      href: "/step/2-target/from-category",
    },
    {
      icon: <Scale className="text-white" />,
      label: "比較したい製品から選ぶ",
      href: "/step/2-target/from-compare",
    },
    // {
    //   icon: <Replace className="text-white" />,
    //   label: "使用中の製品から選ぶ",
    //   href: "/step/2-target/from-current",
    // },
  ];

  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div className="flex flex-col gap-8">
        {headerMenus.map((menu) => (
          <div key={menu.href}>
            <Link
              href={menu.href}
              className="block hover:opacity-70 bg-primary text-white font-bold shadow-md rounded-md p-4"
            >
              <div className="flex gap-4">
                <span>{menu.icon}</span>
                <span> {menu.label}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
