"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ArrowRightFromLine,
  DoorOpen,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import type { z } from "zod";
import { generatePerspectiveFlow } from "./genkit";
import type { GeneratePerspectiveSchema } from "./schema";

type A = {
  theme: string;
  perspectives: z.infer<typeof GeneratePerspectiveSchema>;
};

async function selectItemCategory(
  _: A | null,
  formData: FormData,
): Promise<A | null> {
  if (!formData.has("theme")) {
    return null;
  }
  const theme = formData.get("theme")?.toString() ?? "";
  console.log({ formData, theme });

  const current = await generatePerspectiveFlow(theme);
  return current;
}

type B = {
  importance: {
    [key: string]: string;
  };
};

async function selectPerspective(
  prev: B | null,
  formData: FormData,
): Promise<B | null> {
  console.log({ formData });

  return prev;
}

export default function Home() {
  const [perspectives, categoryFormAction, isPendingCategory] = useActionState(
    selectItemCategory,
    null,
  );
  const [personalImportance, perspectiveFormAction, isPendingPerspective] =
    useActionState(selectPerspective, null);

  return (
    <>
      <div>・TODO: LP的な意味でキャッチコピーを書く</div>
      <div className="text-center h-screen flex flex-col justify-center">
        <Link href="/step/1-method">
          <Button className="shadow-md bg-primary text-white w-60 h-14 font-bold">
            <DoorOpen className="text-white" />
            始める
          </Button>
        </Link>
      </div>

      {/* <form action={categoryFormAction}>
        <div className="m-4 gap-8">
          <div className="flex gap-4">
            <Input
              type="text"
              name="theme"
              className="w-50"
              placeholder="製品カテゴリを入力"
            />
            <Button type="submit" className="shadow-md bg-blue-500 text-white">
              送信
            </Button>
          </div>
        </div>
      </form> */}

      <hr />

      {isPendingCategory && (
        <div className="flex justify-center py-2">
          <LoaderCircle className="animate-spin text-xl" size={32} />
          <p className="px-4 py-1">選ぶPointを考え中</p>
        </div>
      )}

      {perspectives && (
        <form action={perspectiveFormAction}>
          <h2 className="p-4 text-base">
            Step2: {perspectives.theme}
            を選ぶ上で重視するPointを選んでください
          </h2>
          <ul className="rounded-xl">
            {perspectives.perspectives.map((item) => {
              return (
                <li key={item.name} className="py-4 px-2 shadow-md rounded-xl">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <ul className="list-disc ml-4">
                    {item.description.map((desc) => (
                      <li key={desc}>{desc}</li>
                    ))}
                  </ul>
                  <Tabs
                    onChange={(e) => {
                      console.log(e);
                    }}
                    className="max-w-screen"
                  >
                    <TabsList>
                      {item.choices.map((choice) => (
                        <TabsTrigger
                          key={choice}
                          name={item.name}
                          value={choice}
                          onSelect={(e) => {
                            console.log(e);
                          }}
                          className="mx-1 shadow-md bg-gray-200 text-black"
                        >
                          {choice}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <ScrollArea className="mx-2 gap-2 mt-4">
                    {item.choices.map((choice) => (
                      <Button
                        key={choice}
                        name={item.name}
                        value={choice}
                        className="m-1 shadow-md bg-gray-200 text-black"
                      >
                        {choice}
                      </Button>
                    ))}
                  </ScrollArea>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center">
            <button
              type="submit"
              className="shadow-md m-2 py-2 px-4 bg-blue-500 text-white rounded-xl"
            >
              次に進む
            </button>
          </div>
        </form>
      )}
    </>
  );
}
