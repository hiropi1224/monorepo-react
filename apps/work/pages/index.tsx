import { BasicLayout } from "../components/layout/basic-layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col bg-blue-200 h-screen w-screen">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
};

Home.getLayout = (page) => {
  return <BasicLayout>{page}</BasicLayout>;
};
export default Home;
