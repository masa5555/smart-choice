import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, DoorOpen, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { useActionState } from "react";
// import type { z } from "zod";
// import { generatePerspectiveFlow } from "./genkit";
// import type { GeneratePerspectiveSchema } from "./schema";

// type A = {
//   theme: string;
//   perspectives: z.infer<typeof GeneratePerspectiveSchema>;
// };

// async function selectItemCategory(
//   _: A | null,
//   formData: FormData,
// ): Promise<A | null> {
//   if (!formData.has("theme")) {
//     return null;
//   }
//   const theme = formData.get("theme")?.toString() ?? "";
//   console.log({ formData, theme });

//   const current = await generatePerspectiveFlow(theme);
//   return current;
// }

// type B = {
//   importance: {
//     [key: string]: string;
//   };
// };

// async function selectPerspective(
//   prev: B | null,
//   formData: FormData,
// ): Promise<B | null> {
//   console.log({ formData });

//   return prev;
// }

export default function Home() {
  // const [perspectives, categoryFormAction, isPendingCategory] = useActionState(
  //   selectItemCategory,
  //   null,
  // );
  // const [personalImportance, perspectiveFormAction, isPendingPerspective] =
  //   useActionState(selectPerspective, null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              製品選びを、もっとスマートに
            </h1>
            <div className="text-xl text-muted-foreground">
              <p>AIが最適な製品の選択をサポート。</p>
              <p>
                複数の製品を簡単に比較して、あなたにぴったりの一台を見つけましょう。
              </p>
            </div>
            <div className="pt-4">
              <Link href="/step/1-method">
                <Button size="lg" className="text-lg">
                  無料で始める
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-02-09%200.29.14-XEDXp2wl7NqVH8zpnqIGst9Hfomh37.png"
                    alt="カテゴリ選択画面"
                    width={300}
                    height={600}
                    className="rounded-lg mx-auto"
                  />
                  <h3 className="text-xl font-semibold">カテゴリから探す</h3>
                  <p className="text-muted-foreground">
                    家電やインターネット回線など、様々なカテゴリから製品を探すことができます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-02-09%200.29.28-ABS1MVDiC3Xx3CCSalqhqD1pwObwKg.png"
                    alt="製品検索画面"
                    width={300}
                    height={600}
                    className="rounded-lg mx-auto"
                  />
                  <h3 className="text-xl font-semibold">自由に検索</h3>
                  <p className="text-muted-foreground">
                    気になる製品名やカテゴリを直接入力して、スピーディーに比較を始められます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-02-09%200.30.04-kVRXh62AmOs651CSve4f3dDDXbCndQ.png"
                    alt="比較画面"
                    width={300}
                    height={600}
                    className="rounded-lg mx-auto"
                  />
                  <h3 className="text-xl font-semibold">詳細な比較</h3>
                  <p className="text-muted-foreground">
                    選んだ製品の仕様やレビューを細かく比較。最適な選択をサポートします。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">使い方</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-8">
              {[
                {
                  title: "カテゴリを選択",
                  description:
                    "比較したい製品のカテゴリを選択するか、直接製品名を入力します。",
                },
                {
                  title: "製品を追加",
                  description:
                    "比較したい製品を追加していきます。最大5製品まで同時に比較できます。",
                },
                {
                  title: "詳細を比較",
                  description:
                    "スペック、価格、レビューなど、様々な観点から製品を比較できます。",
                },
                {
                  title: "最適な製品を発見",
                  description:
                    "比較結果を参考に、あなたのニーズに最適な製品を見つけましょう。",
                },
              ].map((step) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex-none">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              さっそく製品を比較してみましょう
            </h2>
            <p className="text-xl text-muted-foreground">
              無料で利用できます。面倒な会員登録も不要です。
            </p>
            <div className="pt-4">
              <Link href="/step/1-method">
                <Button size="lg" className="text-lg">
                  サービスを試す
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center gap-2">
            <Scale className="w-5 h-5" />
            <span className="font-semibold">製品比較エージェント</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
