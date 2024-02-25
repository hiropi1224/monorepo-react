import { NextPageWithLayout } from "../_app";
import { StateLayout } from "../../components/layout/state-layout";

const ContextPage: NextPageWithLayout = () => {
  return <main></main>;
};

ContextPage.getLayout = (page) => {
  return <StateLayout>{page}</StateLayout>;
};

export default ContextPage;
