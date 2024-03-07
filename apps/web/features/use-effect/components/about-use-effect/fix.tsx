import { CodeHighlight } from "@mantine/code-highlight";
import {
  Anchor,
  Code,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export function Fix() {
  return (
    <Stack>
      <Title order={2}>Reactにエフェクトの差分を教える</Title>
      <Diff />
      <Title order={2}>useEffectの依存配列について</Title>
      <Deps />
      <Title order={2}>useEffect内の関数</Title>
      <FuncDeps />
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
const removeDeps = `
function Counter() {
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
 
  return <h1>{count}</h1>;
}
`;
const fetch = `
function SearchResults() {
  const [data, setData] = useState({ hits: [] });
 
  async function fetchData() {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=react',
    );
    setData(result.data);
  }
 
  useEffect(() => {
    fetchData();
  }, []); // Is this okay?

  // ...
`;
const fetchWithQuery = `
function SearchResults() {
  const [query, setQuery] = useState('react');
 
  // Imagine this function is also long
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }
 
  // Imagine this function is also long
  async function fetchData() {
    const result = await axios(getFetchUrl());
    setData(result.data);
  }
 
  useEffect(() => {
    fetchData();
  }, []);
 
  // ...
}
`;
const functionDeps = `
function SearchResults() {
  // 🔴 Re-triggers all effects on every render
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }
 
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // 🚧 Deps are correct but they change too often
 
  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // 🚧 Deps are correct but they change too often
 
  // ...
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

function Deps() {
  return (
    <>
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
      <Text>依存配列を正しく設定するには2つの方法がある。</Text>
      <List type="ordered">
        <ListItem>
          <Text>エフェクト内で使われるすべての値を依存配列に設定する</Text>
          <Text c="gray">
            問題は解決するが、<Code>count</Code>
            が変更されるたびにインターバルがクリア、再設定されてしまう
          </Text>
        </ListItem>
        <ListItem>
          <Text>依存関係が少なくなるようエフェクト内の処理を変更する</Text>
        </ListItem>
      </List>
      <Text>
        エフェクトの処理を変更するには依存関係に入れる値がどのように使われているかを見る必要がある。カウンターの例では、
        <Code>count</Code>は<Code>setCount</Code>に渡すために使われている。
        この場合、<Code>setCount</Code>で前の値を使って更新することで
        <Code>count</Code>を依存関係から外すことができる。
      </Text>
      <CodeHighlight code={removeDeps} language="tsx" withCopyButton={false} />
    </>
  );
}

function FuncDeps() {
  return (
    <>
      <Text>
        useEffectを使ってデータ取得を行う場合は以下のような実装となる。
      </Text>
      <CodeHighlight code={fetch} language="tsx" withCopyButton={false} />
      <Text>
        この実装は問題なく機能するが、コードが大きくなるにつれて正しく処理ができているかどうかを判断するのが難しくなっていく。
      </Text>
      <Text>
        次のようにコードが分割されたり、データ取得に<Code>query</Code>
        を使うようになったとしても、useEffectの依存配列が空配列のまま更新し忘れてしまうとstateの変更を同期できず、データの再取得が行われなくなってしまう。
      </Text>
      <CodeHighlight
        code={fetchWithQuery}
        language="tsx"
        withCopyButton={false}
      />
      <Text>
        実際にはこのような問題はESLintの<Code>exhaustive-deps</Code>
        ルールによって警告が出るため開発していると気づくことができる。
      </Text>
      <Title order={2}>複数のuseEffectで同じ関数を呼び出す</Title>
      <Text>
        同じコンポーネント内の複数のエフェクト内が同じ関数を呼び出す場合、どのように対応すればよいか。
      </Text>
      <Text>
        よくある誤解として、「関数は決して変わらないもの」というものがあるが、コンポーネント内で定義された関数はレンダリングのたびに変更されている。そのため、次のように関数を依存配列に入れたとしてもレンダリングのたびにエフェクト内の処理が実行されてしまう。
      </Text>
      <CodeHighlight
        code={functionDeps}
        language="tsx"
        withCopyButton={false}
      />
      <Text>これに対する解決方法は2パターンある</Text>
      <List type="ordered">
        <ListItem>
          <Text>
            関数内でコンポーネントスコープの値が使われていなければそれをコンポーネントの外に出す
          </Text>
          <Text>
            コンポーネント外に関数を定義することでレンダースコープに含まれなくなるため依存配列に指定する必要がなくなる
          </Text>
        </ListItem>
        <ListItem>
          <Text>useCallbackでラップする</Text>
          <Text>
            useCallbackでラップし、適切な依存配列を設定することで必要な場合のみ関数自体を変更するようにする
          </Text>
        </ListItem>
      </List>
    </>
  );
}
