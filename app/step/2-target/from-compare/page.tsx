"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [compareTargetNameList, setCompareTarget] = useState<string[]>([]);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">比較したい製品を指定する</h2>
      <p>製品名の指定の形式</p>
      <ul className="list-disc pl-4 p-2">
        <li>自由入力. 例: 「Pixel 9a」</li>
        <li>WebページのURL. (製品名記載)</li>
        <li>画像. (製品名記載)</li>
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
