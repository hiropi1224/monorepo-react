import { type NextPageWithLayout } from "./_app";
import { DefaultLayout } from "../components/layout/default-layout";
import { SampleCard } from "../components/sample-card/sample-card";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <SampleCard />
    </main>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
