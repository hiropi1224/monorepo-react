import { CodeHighlight } from "@mantine/code-highlight";
import { Anchor, Code, Stack, Text, Title } from "@mantine/core";

export function Fix() {
  return (
    <Stack>
      <Title order={2}>Reactにエフェクトの差分を教える</Title>
      <Diff />
      <Text>
        useEffectはデフォルトで毎回のレンダーの後に実行されるため、不要な再実行を防ぐために依存配列（deps）を設定する。
      </Text>
      <Text>
        次のコードは1秒ごとにインクリメントするカウンターをuseEffectを使って書いている。useEffectのメンタルモデルが「依存関係によって、いつエフェクトを再トリガーできるかを指定できる」というものであれば以下のコードはうまく動くように見える。しかし、この例では1回しかインクリメントしない。
      </Text>
      <CodeHighlight code={lyingDeps} withCopyButton={false} />
      <Text>
        これはエフェクト内で<Code>count</Code>
        を使っているにもかかわらず、依存配列を空としているから。
      </Text>
      <Text>
        useEffectはどのようにstateを読み取っているかでも見たが、エフェクトは常に最新の値を見るような仕組みになっておらず、自分が属しているレンダーのstateを見ている。ここではエフェクトの依存配列が空配列のため、最初のレンダリングのstateを使って処理が行われる（つまり常に
        <Code>setCount(0 + 1)</Code>が行われている）
      </Text>
    </Stack>
  );
}

const beforeCode = `
<h1 className="Greeting">
  Hello, Dan
</h1>
`;
const afterCode = `
<h1 className="Greeting">
  Hello, Yuzhi
</h1>
`;
const diffObj = `
const oldProps = {className: 'Greeting', children: 'Hello, Dan'};
const newProps = {className: 'Greeting', children: 'Hello, Yuzhi'};
`;
const result = `
domNode.innerText = 'Hello, Yuzhi';
// No need to touch domNode.className
`;
const lyingDeps = `
function Counter() {
    const [count, setCount] = useState(0);
   
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);
   
    return <h1>{count}</h1>;
  }
`;

function Diff() {
  return (
    <>
      <Text>
        ReactではDOMの代わりに仮想DOM（UIツリー）を構築し、前回レンダリング時の仮想DOMと仮想DOMを比較し、差分だけをDOMに反映する。
      </Text>
      <Anchor
        href="https://ja.react.dev/learn/understanding-your-ui-as-a-tree"
        target="_blank"
      >
        UI をツリーとして理解する
      </Anchor>

      <Text>このコードが</Text>
      <CodeHighlight code={beforeCode} withCopyButton={false} />
      <Text>このように更新されたとき</Text>
      <CodeHighlight code={afterCode} withCopyButton={false} />
      <Text>
        Reactでは2つのオブジェクトを認識し、それぞれのプロパティを比較したうえでDOMの更新が必要かどうかを判断する。
      </Text>
      <CodeHighlight code={diffObj} withCopyButton={false} />
      <Text>
        この場合はchildrenに変更があるため<Code>domNode.className</Code>
        は変更する必要はなく、<Code>domNode.innerText</Code>のみ変更すれば良い。
      </Text>
      <CodeHighlight code={result} withCopyButton={false} />
    </>
  );
}
