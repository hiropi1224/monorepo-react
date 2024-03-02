import { Title } from "@mantine/core";
import { BadPractice } from "../../../components/bad-practice/bad-practice";

export default function BadPage(): JSX.Element {
  return (
    <div>
      <Title>useEffect Bad</Title>
      <BadPractice />
    </div>
  );
}
