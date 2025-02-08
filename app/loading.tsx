import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    </div>
  );
}
