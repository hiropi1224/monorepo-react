import { CodeHighlight } from "@mantine/code-highlight";
import { Stack, Title, List, ListItem, Code, Text } from "@mantine/core";

export function About() {
  return (
    <Stack>
      <Title order={2}>useEffectの基本的な書き方</Title>
      <CodeHighlight
        code={useEffectCode}
        language="tsx"
        withCopyButton={false}
      />
      <Title order={3}>useEffectの引数</Title>
      <Args />
      <Title order={3}>useEffectはどのようにstateを読み取っているか</Title>
      <ReadState />
      <Text>カウンターボタンをクリックした後に起きることをまとめると</Text>
      <DescriptionAfterClickRender />
      <Text>
        次のコードのようにuseEffect内で遅延をかけてログを出力するとどうなるか？
      </Text>
      <LogOutput />
      <Text>
        useEffect内で最新の値を読み取りたい場合は<Code>refs</Code>が使える
      </Text>
      <Title order={3}>useEffectはどのようにstateを読み取っているか</Title>
    </Stack>
  );
}

const useEffectCode = `
useEffect(() => {
    // componentDidMount
}, []);

useEffect(() => {
    // componentDidUpdate
}, [something, anotherThing]);

useEffect(() => {
    return () => {
        // componentWillUnmount
    }
}, []);
`;

const renderCounter = `
// During first render
function Counter() {
  const [count, setCount] = useState(0);
  // ...
  useEffect(
    // Effect function from first render
    () => {
      document.title = \`You clicked ${0} times\`;
    }
  );
  // ...
}
 
// After a click, our function is called again
function Counter() {
  const [count, setCount] = useState(0);
  // ...
  useEffect(
    // Effect function from second render
    () => {
      document.title = \`You clicked ${1} times\`;
    }
  );
  // ...
}
 
// After another click, our function is called again
function Counter() {
  const [count, setCount] = useState(0);
  // ...
  useEffect(
    // Effect function from third render
    () => {
      document.title = \`You clicked ${2} times\`;
    }
  );
  // ..
}
`;

const experimentCode = `
function Counter() {
    const [count, setCount] = useState(0);
   
    useEffect(() => {
      setTimeout(() => {
        console.log(\`You clicked \${count} times\`);
      }, 3000);
    });
   
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }`;

const classCode = `
componentDidUpdate() {
    setTimeout(() => {
      console.log(\`You clicked \${this.state.count} times\`);
    }, 3000);
  }
`;

const delayEx = `
// propsから読み取ろうが、遅延をかけて読み取ろうが同じレンダリング内であればprops、stateは変わらない

function Example(props) {
  // props.counterをpropsから読み取る
  const counter = props.counter;
  useEffect(() => {
    setTimeout(() => {
      console.log(counter);
    }, 1000);
  });
  // ...
}

function Example(props) {
  useEffect(() => {
    // 1000msの遅延をかけた後にprops.counterを読み取る
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
  // ...
}
`;

function Args() {
  return (
    <List>
      <ListItem>
        <Code>setup</Code>
        <Text fz="xs">- コンポーネントが初めてDOMに追加されると実行</Text>
        <Text fz="xs">
          -
          依存配列があれば古い値を使ってクリーンアップ関数を実行し、その後新しい値を使ってセットアップ関数を実行
        </Text>
      </ListItem>
      <ListItem>
        <Code>dependencies</Code>
        <Text fz="xs">
          -
          コード内で参照されるすべてのリアクティブな値(props、state、コンポーネント本体に直接宣言されたすべての変数、関数)
        </Text>
      </ListItem>
    </List>
  );
}

function ReadState() {
  return (
    <>
      <Text>
        何らかの「データバインディング」や「ウォッチング」によってstateの更新がエフェクト関数内で行われているのか？
        <br />
        またはstateはReactがコンポーネント内で設定する変更可能な変数で、エフェクトがつてに最新の値を見るような仕組みになっているのか？
      </Text>
      <Text>
        →stateは特定のコンポーネントレンダー内では一定であるため、自分が属しているレンダーのstateを見ている。
      </Text>
      <CodeHighlight
        code={renderCounter}
        language="tsx"
        withCopyButton={false}
      />
    </>
  );
}

function DescriptionAfterClickRender() {
  return (
    <>
      <List>
        <ListItem>
          <Text>
            Component:
            <br /> Reactにstateを1に変更するよう伝える(setCountを実行)
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            React:
            <br />
            stateが1のときのUIを求める(stateを更新後、再レンダリングを要求)
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            Component:
            <br />
            レンダー結果をReactに渡し(再レンダリング)、useEffectの処理を実行するよう伝える
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            React:
            <br />
            UIを更新し、ブラウザのDOMを変更する(再レンダリングの結果から差分を検知してDOMに反映)
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            Browser: 変更を画面に描画する
            <br />
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            React: ここまでの一連のレンダーに属するエフェクトの処理を実行する
          </Text>
          <Text fz="sm">
            ※エフェクト内でstateの更新があれば改めてこれらの一連の流れが行われる
          </Text>
        </ListItem>
      </List>
      <Text>
        エフェクトはすべてのレンダリング後に実行され、概念的にはコンポーネント出力の一部であり、その特定のレンダリングからすべてのpropsとstateを見ることができる。
      </Text>
    </>
  );
}

function LogOutput() {
  return (
    <>
      <CodeHighlight
        code={experimentCode}
        language="tsx"
        withCopyButton={false}
      />
      <Text>
        それぞれのログは特定のレンダリングに属しているため、それぞれのカウント値が出力される。
      </Text>
      <Text>
        だが、<Code>this.state</Code>を使ったクラスの実装ではこの挙動と異なる。
      </Text>
      <CodeHighlight code={classCode} language="tsx" withCopyButton={false} />
      <Text>
        <Code>this.state.count</Code>
        は特定のレンダリングに属しているカウントではなく、常に最新のカウントを指している。
      </Text>
      <Text>
        コンポーネント内のすべての関数はレンダリング時のprops、stateをキャプチャしているため、以下の例のようにコンポーネント内で遅延を付けてpropsを読み取ろうとしても意味がない。
      </Text>
      <CodeHighlight code={delayEx} language="tsx" withCopyButton={false} />
    </>
  );
}
