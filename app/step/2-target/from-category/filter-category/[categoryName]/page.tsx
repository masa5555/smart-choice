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
              <div className="hidden">
                <input type="text" name={"category"} value={item.name} />
              </div>

              <h3 className="font-semibold mb-1">{item.name}</h3>
              <ul className="list-disc ml-4">
                {item.description.map((desc) => (
                  <li key={desc} className="text-gray-600">
                    {desc}
                  </li>
                ))}
              </ul>

              <RadioGroup
                className="flex flex-col mx-0 gap-2 mt-3 md:flex-row md:mx-2 md:mt-4"
                name={item.name}
              >
                {item.choices.map((choice, index) => (
                  <Label
                    htmlFor={`${item.name}-${index}`}
                    key={`${item.name}-${index}`}
                    className="cursor-pointer relative flex w-2/3 md:w-auto text-center items-center rounded-lg px-4 py-2 shadow-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <RadioGroupItem
                      value={choice}
                      id={`${item.name}-${index}`}
                      className="cursor-pointer"
                    />
                    <span className="pl-4">{choice}</span>
                  </Label>
                ))}
              </RadioGroup>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="shadow-md bg-primary text-white m-4 py-2 px-8 rounded-xl"
        >
          次に進む
        </Button>
      </div>
    </form>
  );
}
