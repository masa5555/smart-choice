import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
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
    </>
  );
}
