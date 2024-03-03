import { Title } from "@mantine/core";
import { BadPractice } from "../../../features/use-effect/components/bad-practice/bad-practice";
import { BadForm } from "../../../features/use-effect/components/form";

export default function BadPage(): JSX.Element {
  return (
    <div>
      <Title>useEffect Bad</Title>
      <BadPractice />
      <BadForm />
    </div>
  );
}
