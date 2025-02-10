"use client";

import { suggestCategoryFlow } from "@/app/_flow/suggestCategoryFlow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CirclePlus, LoaderCircle, Scale, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryCandidates, setCategoryCandidates] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [compareTargetNameList, setCompareTarget] = useState<string[]>([]);

  const handleAddCompareTarget = async (input: string): Promise<void> => {
    setIsLoadingCategory(true);
    const result = await suggestCategoryFlow(input);
    setCategoryCandidates((prev) => [...prev, ...result.categoryList]);
    if (category === "") {
      setCategory(result.categoryList[0]);
    }
    setIsLoadingCategory(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold flex gap-4">
        <Scale className="text-primary" /> 比較したい製品を指定する
      </h2>
      <div className="text-gray-500 text-sm">
        <p className="py-2">以下の形式で比較対象を指定できます</p>
        <ul className="list-disc pl-4">
          <li>名前で入力. 例: 「Pixel 8a」</li>
          <li>WebページのURL (TBD...)</li>
          <li>画像 (TBD...)</li>
        </ul>
      </div>

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
                className="bg-secondary text-primary shadow-md hover:bg-secondary"
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
          className="bg-secondary text-primary shadow-md hover:bg-secondary"
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
            if (categoryCandidates.length === 0) {
              handleAddCompareTarget(input);
            }
          }}
        >
          <CirclePlus className="text-primary" /> 追加
        </Button>
      </div>

      <div className="mt-10">
        {/** TODO: 自由入力もできるようにしたい */}
        <div className="w-[250px] mx-auto">
          <div className="flex">
            <p className="text-sm">カテゴリを指定</p>
            {isLoadingCategory && (
              <LoaderCircle className="px-1 animate-spin" size={24} />
            )}
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categoryCandidates.map((categoryCandidate) => (
                  <SelectItem value={categoryCandidate} key={categoryCandidate}>
                    {categoryCandidate}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 text-center">
          <Button
            className="px-12 w-1/2"
            size="lg"
            onClick={() => {
              if (compareTargetNameList.length < 2) {
                toast({
                  variant: "destructive",
                  title: "比較対象は2つ以上指定してください",
                });
                return;
              }
              if (category === "") {
                toast({
                  variant: "destructive",
                  title: "カテゴリを指定してください",
                });
                return;
              }
            }}
          >
            比較開始
          </Button>
        </div>
      </div>
    </div>
  );
}
