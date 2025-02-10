import { generatePerspectiveFlow } from "@/app/_flow/generatePerspectiveFlow";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    categoryName: string;
  }>;
};

export default async function Page(props: Props) {
  const { categoryName } = await props.params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  const perspectives = await generatePerspectiveFlow(decodedCategoryName);

  return (
    <div>
      <h2 className="p-4 text-xl font-bold">
        {decodedCategoryName}で重視するポイントを選ぶ
      </h2>
      <ul className="rounded-xl">
        {perspectives.perspectives.map((item) => {
          return (
            <li key={item.name} className="py-4 pl-4 pr-2 shadow-md rounded-xl">
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <ul className="list-disc ml-4">
                {item.description.map((desc) => (
                  <li key={desc} className="text-gray-600">
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="mx-2 gap-2 mt-4">
                {item.choices.map((choice) => (
                  <Button
                    key={choice}
                    className="m-1 shadow-md bg-gray-200 text-primary hover:bg-secondary"
                  >
                    <span className="">{choice}</span>
                  </Button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="shadow-md bg-primary text-white m-2 py-2 px-4 rounded-xl"
        >
          次に進む
        </Button>
      </div>
    </div>
  );
}
