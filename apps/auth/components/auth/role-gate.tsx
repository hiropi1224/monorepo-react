import { UserRole } from "@prisma/client";
import { ReactNode } from "react";
import { FormError } from "~/components/form-error";
import { useCurrentRole } from "~/hooks/use-current-role";

interface RoleGateProps {
  children: ReactNode;
  allowedRole: UserRole;
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <div>{children}</div>;
}
