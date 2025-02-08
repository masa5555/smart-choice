"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CirclePlus, Scale, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();

  const [input, setInput] = useState("");
  const [compareTargetNameList, setCompareTarget] = useState<string[]>([]);
  // LLMで候補を返したら面白そう
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold flex gap-4">
        <Scale className="text-primary" /> 比較したい製品を指定する
      </h2>
      <p className="py-2">以下の形式で比較対象を指定できます</p>
      <ul className="list-disc pl-4">
        <li>自由入力. 例: 「Pixel 9a」</li>
        <li>WebページのURL</li>
        <li>画像</li>
      </ul>
      {compareTargetNameList.length > 0 && (
        <div className="mt-2">
          {compareTargetNameList.map((targetName, index) => (
            <div key={targetName} className="flex gap-4 py-2">
              <div
                className="grow bg-gray-100 p-2 rounded-md gap-2 items-center"
                key={targetName}
              >
                {targetName}
              </div>
              <Button
                onClick={() => {
                  const newCompareTarget = [...compareTargetNameList];
                  newCompareTarget.splice(index, 1);
                  setCompareTarget(newCompareTarget);
                }}
              >
                <Trash2 />
                削除
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <Input
          placeholder="比較したい製品を入力"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (input === "") {
              toast({
                variant: "destructive",
                title: "入力が空です",
              });
              return;
            }
            if (compareTargetNameList.length >= 5) {
              toast({
                variant: "destructive",
                title: "比較対象は最大5つまで追加できます",
              });
              return;
            }
            if (input.length > 50) {
              toast({
                variant: "destructive",
                title: "50文字以内で入力してください",
              });
              return;
            }
            setCompareTarget([...compareTargetNameList, input]);
            setInput("");
          }}
        >
          <CirclePlus /> 追加
        </Button>
      </div>
    </div>
  );
}
