"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { z } from "zod";
import { generatePerspectiveFlow } from "./genkit";
import type { GeneratePerspectiveSchema } from "./schema";

export default function Home() {
  type A = {
    theme: string;
    perspectives: z.infer<typeof GeneratePerspectiveSchema>;
  };
  const [perspective, setPerspective] = useState<A | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function selectItemCategory(formData: FormData) {
    if (!formData.has("theme")) {
      return;
    }
    const theme = formData.get("theme")?.toString() ?? "";

    setIsLoading(true);
    const suggestion = await generatePerspectiveFlow(theme);
    setPerspective({
      theme,
      perspectives: suggestion,
    });
    setIsLoading(false);
  }

  const ecCategoryList = ["冷蔵庫", "洗濯機", "食器洗い乾燥機", "電子レンジ"];

  const headerMenus = [
    { name: "商品カテゴリから選ぶ", link: "#" },
    { name: "比較したい商品から選ぶ", link: "#" },
    { name: "使用中の製品から選ぶ", link: "#" },
  ];

  console.log({ isLoading, perspective });

  return (
    <main>
      <div className="flex gap-8 bg-gray-700 p-4">
        {headerMenus.map((menu) => {
          return (
            <a
              key={menu.name}
              href={menu.link}
              className="hover:opacity-70 text-white font-bold"
            >
              {menu.name}
            </a>
          );
        })}
      </div>
      <hr />
      <form action={selectItemCategory}>
        <div className="flex m-4 gap-8">
          <label htmlFor="theme">商品カテゴリを入力して: </label>
          <Input type="text" name="theme" className="w-50" />
          <Button type="submit" className="bg-blue-500">
            Submit
          </Button>
        </div>

        <div className="m-4">
          <h2 className="text-xl font-bold mb-4">人気の商品カテゴリ:</h2>
          <div className="flex gap-4 bg-gray-200 m-4 rounded-xl">
            {ecCategoryList.map((category) => {
              return (
                <Button
                  type="submit"
                  key={category}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    perspective?.theme === category
                      ? "bg-gray-700 text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </form>

      <hr />

      {isLoading && <LoaderCircle className="animate-spin" />}
      {perspective && (
        <form>
          <h2 className="p-4 font-bold text-xl">
            {perspective.theme}を選ぶ観点
          </h2>
          <ul className="bg-gray-200 m-8 rounded-xl">
            {perspective.perspectives.map((item) => {
              return (
                <li key={item.name} className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="flex gap-4 m-4">
                    {item.choices.map((choice) => (
                      <Button
                        key={choice}
                        type="submit"
                        className="bg-gray-700 text-white"
                      >
                        {choice}
                      </Button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      )}

      <hr />
    </main>
  );
}
