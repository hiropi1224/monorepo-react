import { Title } from "@mantine/core";
import { BestPractice } from "../../../features/use-effect/components/best-practice";
import { BestForm } from "../../../features/use-effect/components/form";

export default function BestPage(): JSX.Element {
  return (
    <div>
      <Title>useEffect Best</Title>
      <BestPractice />
      <BestForm />
    </div>
  );
}
