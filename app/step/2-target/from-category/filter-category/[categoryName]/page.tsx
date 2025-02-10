import { generatePerspectiveFlow } from "@/app/_flow/generatePerspectiveFlow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { handleSubmit } from "./_action";

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
    <form action={handleSubmit}>
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

              <RadioGroup className="flex mx-2 gap-2 mt-4" name={item.name}>
                {item.choices.map((choice, index) => (
                  <span
                    key={`${item.name}-${index}`}
                    className="cursor-pointer relative flex items-center rounded-lg px-4 py-2 shadow-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <RadioGroupItem
                      value={choice}
                      id={`${item.name}-${index}`}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={`${item.name}-${index}`}
                      className="pl-6 cursor-pointer"
                    >
                      {choice}
                    </Label>
                  </span>
                ))}
              </RadioGroup>
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
    </form>
  );
}
