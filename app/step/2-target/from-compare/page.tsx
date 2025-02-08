"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale } from "lucide-react";
import { useState } from "react";

export default function Page() {
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
      {compareTargetNameList.map((targetName, index) => (
        <div key={targetName}>
          <Input
            type="text"
            value={targetName}
            onChange={(e) => {
              const newCompareTarget = [...compareTargetNameList];
              newCompareTarget[index] = e.target.value;
              setCompareTarget(newCompareTarget);
            }}
          />
          <Button
            onClick={() => {
              const newCompareTarget = [...compareTargetNameList];
              newCompareTarget.splice(index, 1);
              setCompareTarget(newCompareTarget);
            }}
          >
            削除
          </Button>
        </div>
      ))}
    </div>
  );
}
