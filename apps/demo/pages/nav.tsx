import { type NextPageWithLayout } from "./_app";
import { NavLayout } from "../components/layout/nav-layout";
import { SampleCard } from "../components/sample-card/sample-card";

const Nav: NextPageWithLayout = () => {
  return (
    <main>
      <SampleCard />
    </main>
  );
};

Nav.getLayout = (page) => {
  return <NavLayout>{page}</NavLayout>;
};

export default Nav;
