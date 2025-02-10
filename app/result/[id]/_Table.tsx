import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { type FC } from "react";

type Props = {
  products: {
    name: string;
    description: string;
    price: number;
    機能: string;
    デザイン: string;
    使いやすさ: string;
  }[];
};
export const ProductComparisonTable: FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>商品データがありません。</div>;
  }

  // 最初の商品のキーを観点として使用 (name, description, price以外)
  const aspects = Object.keys(products[0]).filter(
    (key) => key !== "name" && key !== "description" && key !== "price",
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>観点</TableHead>
          {products.map((product) => (
            <TableCell key={product.name}>{product.name}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {aspects.map((aspect) => (
          <TableRow key={aspect}>
            <th>{aspect}</th>
            {products.map((product: Record<string, string | number>) => (
              <TableCell key={product.name}>{product[aspect] ?? ""}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
