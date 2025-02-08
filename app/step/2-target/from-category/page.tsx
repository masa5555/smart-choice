import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const categoryNestedList = [
    {
      name: "家電",
      children: ["冷蔵庫", "洗濯機", "食洗機", "電子レンジ", "パソコン"],
    },
    {
      name: "インターネット回線",
      children: ["光回線", "モバイル回線"],
    },
    {
      name: "Webサービス",
      children: ["映像配信", "雑誌・漫画", "英語学習", "生成AI", "確定申告"],
    },
    {
      name: "その他",
      children: ["引っ越し", "ふるさと納税", "クレジットカード"],
    },
  ];

  return (
    <div className="p-4 flex flex-col gap-8 bg-secondary">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">比較カテゴリを指定する</h2>
        </CardHeader>
        <CardContent>
          <span className="font-medium text-sm">例) 「ドラム式洗濯機」</span>
          <div className="flex gap-3">
            <Input
              type="text"
              name="theme"
              className="w-50"
              placeholder="カテゴリ名を自由入力"
            />
            <Button type="submit" className="shadow-md bg-primary text-white">
              <ArrowRight />
              送信
            </Button>
          </div>
        </CardContent>
      </Card>
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">人気の製品カテゴリから選ぶ</h2>

        <div className="grid gap-4">
          {categoryNestedList.map((category) => {
            return (
              <div
                key={category.name}
                className="bg-white font-bold shadow-md rounded-xl tracking-wide"
              >
                <CardHeader>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.children.map((name) => (
                      <Badge
                        key={name}
                        variant="secondary"
                        className="shadow-sm cursor-pointer text-base px-4 py-1 hover:opacity-70 tracking-wide"
                      >
                        <Link
                          href={`/step/2-target/from-category/filter-category/${encodeURIComponent(name)}`}
                        >
                          {name}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
