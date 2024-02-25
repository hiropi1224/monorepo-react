import { Inter } from "next/font/google";
import { type NextPageWithLayout } from "./_app";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Pages Route Demo</div>
    </main>
  );
};

Home.getLayout = (page) => {
  return <div>{page}</div>;
};

export default Home;
