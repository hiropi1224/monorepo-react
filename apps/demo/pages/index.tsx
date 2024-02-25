import { type NextPageWithLayout } from "./_app";
import { DefaultLayout } from "../components/layout/default-layout";
import Link from "next/link";
import { SampleCard } from "../components/sample-card/sample-card";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <Link href="/nav">navページ</Link>
      <SampleCard />
    </main>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
