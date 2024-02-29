import { FetchLayout } from "../../components/layout/fetch-layout";
import { FetchPage } from "../../components/pages/fetch";
import { NextPageWithLayout } from "../_app";

const Home: NextPageWithLayout = () => {
  return <FetchPage />;
};

Home.getLayout = (page) => {
  return <FetchLayout>{page}</FetchLayout>;
};
export default Home;
