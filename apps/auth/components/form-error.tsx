import Link from "next/link";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type FormErrorProps = {
  message: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <BsExclamationTriangleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
