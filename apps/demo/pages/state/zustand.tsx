import { NextPageWithLayout } from "../_app";
import { StateLayout } from "../../components/layout/state-layout";

const ZustandPage: NextPageWithLayout = () => {
  return <main></main>;
};

ZustandPage.getLayout = (page) => {
  return <StateLayout>{page}</StateLayout>;
};

export default ZustandPage;
