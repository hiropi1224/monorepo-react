import { CodeHighlight } from "@mantine/code-highlight";
import { Anchor, Stack, Text, Title } from "@mantine/core";

export function Caution() {
  return (
    <Stack>
      <Title order={2}>
        useEffectはコンポーネントのライフサイクル用hookではない
      </Title>
      <DoNotLifeCycle />
      <Title order={3}>
        <Anchor
          href="https://ja.react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state"
          target="_blank"
        >
          propsまたはstateに基づいてstateを更新する
        </Anchor>
      </Title>
    </Stack>
  );
}

const wrongMentalModelForEffects = `
useEffect(() => {
  if(foo && bar && (baz || qui)) {
    doSomethings();
  } else {
    doSomethingsElse();
  }
}, [foo, bar, baz, qui]);
`;

function DoNotLifeCycle() {
  return (
    <>
      <Text>
        useEffectに関連する依存配列を設定し、条件によって何らかの処理を行うような処理があるが、
        これらはuseEffectの適切な使い方ではない。
      </Text>
      <CodeHighlight
        code={wrongMentalModelForEffects}
        language="tsx"
        withCopyButton={false}
      />
      <Text>
        useEffectはReact外のシステムとコンポーネントを同期させるためのものでドキュメントではエフェクトとイベントハンドラーを区別している。
      </Text>
      <Anchor
        href="https://ja.react.dev/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events"
        target="_blank"
      >
        エフェクトとは何であり、イベントとどう異なるのか
      </Anchor>
      <Text>
        Reactはレンダリング時のマウントや更新などの区別はなく、現在のprops、stateに応じてDOMと同期する。
        useEffectを使うと、Reactツリーの外にあるものをprops、stateに従って同期させることができる。
      </Text>
      <Text>
        マウント/アップデート/アンマウントのようなメンタルモデルとは微妙に異なる。コンポーネントが初めてレンダリングされたかどうかで動作が異なるエフェクトを書くのは流れに逆らうことになる。
      </Text>
      <Text>
        すべてのレンダリングですべてのエフェクトを実行するのは効率的ではなく、場合によっては無限ループを起こすこともある。これはどのように解決すればよいだろうか。
      </Text>
    </>
  );
}
