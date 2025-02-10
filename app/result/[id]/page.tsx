import { Suspense } from "react";
import createNewResult from "./_action";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: Props) {
  const { id } = await props.params;

  const result = await createNewResult({ id });
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
