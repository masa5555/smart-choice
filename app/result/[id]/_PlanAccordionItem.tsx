"use client";
import { client } from "@/app/apiClient";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  name: string;
};

const useGetPlan = (id: string) => {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: async () => {
      const res = await client.api.plans[":id"].$get({ param: { id } });
      return res;
    },
  });
};
const useIntervalBy1s = (callback: () => void) => {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback; // 新しいcallbackをrefに格納！
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    const id = setInterval(tick, 2000);
    return () => {
      clearInterval(id);
    };
  }, []); //refはミュータブルなので依存配列に含めなくてもよい
};

export const PlanAccordionItem = ({ id, name }: Props) => {
  // fetch poling 1s
  const { data, refetch } = useGetPlan(id);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<string>("");

  const callback = async () => {
    if (!data?.ok) {
      return;
    }

    const json = await data.json();

    if (json.body.status === "finished") {
      setIsLoading(false);
      setResult(JSON.stringify(json.body.result));
      return;
    }

    if (data.ok) {
      refetch();
    }
  };

  useIntervalBy1s(callback);

  const loadingLabelMap: Record<string, string> = {
    reasoning: "思考中...",
    research: "調査中...",
    observe: "要約中...",
    format: "データを作成中...",
  };

  const finishedLabelMap: Record<string, string> = {
    reasoning: "思考完了",
    research: "調査完了",
    observe: "要約完了",
    format: "データ作成完了",
  };

  return (
    <AccordionItem
      key={id}
      value={id}
      className="border rounded-lg mb-1 px-4 py-1 hover:shadow-md transition-shadow"
    >
      <AccordionTrigger>
        {isLoading && (
          <>
            <LoaderCircle className="animate-spin" size={28} />
            <div className="flex gap-8">{loadingLabelMap[name] ?? ""}</div>
          </>
        )}
        {!isLoading && (
          <>
            <CheckCircle className="text-green-500" size={28} />
            <div className="flex gap-8">{finishedLabelMap[name] ?? ""}</div>
          </>
        )}
      </AccordionTrigger>
      <AccordionContent>
        {result ? (
          <pre>{result}</pre>
        ) : (
          <p>進んでいる内容を途中経過を表示したい</p>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
