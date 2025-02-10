import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
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

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Accordion collapsible type="single" className="m-4">
          {result.plans.map((plan) => (
            <AccordionItem
              key={plan.id}
              value={plan.id}
              className="border rounded-lg mb-4 px-4 py-1 hover:shadow-md transition-shadow"
            >
              <AccordionTrigger>
                <div className="flex gap-8">
                  <span>
                    {plan.id} {plan.name}
                  </span>

                  <LoaderCircle className="animate-spin" size={28} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{plan.name}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
    </div>
  );
}
