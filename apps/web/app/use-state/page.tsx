import { Stack, Text, Title } from "@mantine/core";
import { AboutUseState } from "../../features/use-state/components/about-use-state/about-use-state";

export default function UseStatePage(): JSX.Element {
  return (
    <Stack>
      <Title order={1}>About useState</Title>
      <AboutUseState />
      <Text>
        クラスコンポーネントと関数コンポーネントで挙動がことなる。
        関数コンポーネントではデフォルトでpropsとstateをキャプチャする。
        クラスコンポーネントでは、this.propsやthis.stateを読むことで最新のpropsとstateを読み取ることができる。
      </Text>
    </Stack>
  );
}
