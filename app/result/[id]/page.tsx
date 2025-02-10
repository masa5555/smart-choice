import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { ProductComparisonTable } from "./_Table";
import { getPlans } from "./_action";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const result = await getPlans({ id });
  console.log({ result });

  const labelMap: Record<string, string> = {
    reasoning: "思考中...",
    research: "調査中...",
    observe: "要約中...",
    format: "データを作成中...",
  };

  const products = [
    {
      name: "商品A",
      description: "商品Aの説明",
      price: 1000,
      機能: "高性能",
      デザイン: "シンプル",
      使いやすさ: "簡単",
    },
    {
      name: "商品B",
      description: "商品Bの説明",
      price: 1500,
      機能: "多機能",
      デザイン: "スタイリッシュ",
      使いやすさ: "普通",
    },
    {
      name: "商品C",
      description: "商品Cの説明",
      price: 2000,
      機能: "プロ向け",
      デザイン: "高機能",
      使いやすさ: "複雑",
    },
    {
      name: "商品D",
      description: "商品Dの説明",
      price: 2500,
      機能: "初心者向け",
      デザイン: "シンプル",
      使いやすさ: "簡単",
    },
    {
      name: "商品E",
      description: "商品Eの説明",
      price: 3000,
      機能: "高性能",
      デザイン: "シンプル",
      使いやすさ: "簡単",
    },
    {
      name: "商品F",
      description: "商品Fの説明",
      price: 3500,
      機能: "多機能",
      デザイン: "スタイリッシュ",
      使いやすさ: "普通",
    },
    {
      name: "商品G",
      description: "商品Gの説明",
      price: 4000,
      機能: "プロ向け",
      デザイン: "高機能",
      使いやすさ: "複雑",
    },
    {
      name: "商品H",
      description: "商品Hの説明",
      price: 4500,
      機能: "初心者向け",
      デザイン: "シンプル",
      使いやすさ: "簡単",
    },
  ];

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Accordion collapsible type="single" className="m-4">
          {result.plans.map((plan) => (
            <AccordionItem
              key={plan.id}
              value={plan.id}
              className="border rounded-lg mb-1 px-4 py-1 hover:shadow-md transition-shadow"
            >
              <AccordionTrigger>
                <LoaderCircle className="animate-spin" size={28} />
                <div className="flex gap-8">{labelMap[plan.name] ?? ""}</div>
              </AccordionTrigger>
              <AccordionContent>
                <p>進んでいる内容を途中経過を表示したい</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
      <div className="m-4 border rounded-lg">
        <h2 className="text-xl font-bold p-4">商品比較表</h2>
        <ProductComparisonTable products={products} />
      </div>
    </div>
  );
}
