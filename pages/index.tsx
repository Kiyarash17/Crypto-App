import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import CoinsList from "../components/Tables/CoinsList";
import MainPage from "../components/layouts/MainPage";
import MainTable from "../components/Tables/MainTable";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Crypto App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <MainPage />
        <MainTable />
      </MainLayout>
    </div>
  );
};

export default Home;
