import Link from "next/link";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type FormSuccessProps = {
  message: string;
};

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BsExclamationTriangleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
