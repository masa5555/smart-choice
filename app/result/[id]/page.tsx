import { menuSuggestionStreamingFlow } from "@/app/_flow/generateResultFlow";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const result = await menuSuggestionStreamingFlow("ステーキ");
  console.log({ result });

  return (
    <div>
      <div> Result:{id} Page</div>
      <Suspense fallback={<div>Loading...</div>}>
        <p>{JSON.stringify(result)}</p>
      </Suspense>
    </div>
  );
}
