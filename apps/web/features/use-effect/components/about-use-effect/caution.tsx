import { CodeHighlight } from "@mantine/code-highlight";
import { Anchor, Stack, Text, Title } from "@mantine/core";

export function Caution() {
  return (
    <Stack>
      <Title order={2}>
        useEffectはコンポーネントのライフサイクル用hookではない
      </Title>
      <DoNotLifeCycle />
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
        Reactはレンダリング時のマウントや更新などの区別はなく、
        <strong>現在のprops、stateに応じてDOMと同期する。</strong>
        useEffectを使うと、Reactツリーの外にあるものをprops、stateに従って同期させることができる。
      </Text>
      <Text>
        useEffectのメンタルモデルは同期であり、マウント/アップデート/アンマウントのようなメンタルモデルとは微妙に異なる。コンポーネントが初めてレンダリングされたかどうかで動作が異なるエフェクトを書くのは流れに逆らうことになる。
      </Text>
      <Text>
        すべてのレンダリングですべてのエフェクトを実行するのは効率的ではなく、場合によっては無限ループを起こすこともある。これはどのように解決すればよいだろうか。
      </Text>
    </>
  );
}
