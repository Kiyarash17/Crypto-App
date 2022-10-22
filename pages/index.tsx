import { Typography, Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import MainPage from "../components/layouts/MainPage";
import MainTable from "../components/Tables/MainTable";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const Home: NextPage = () => {
  return (
    <div className="absolute lg:relative">
      <Head>
        <title>Crypto App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Grid2 container className="w-full">
          <Grid2>
            <MainPage />
          </Grid2>
          <Grid2 className="my-5 w-full">
            <Container>
              <Typography className="mt-0" align="center" variant="h3">Top Currencies</Typography>
              <Typography align="center" variant="subtitle2" className="w-11/12 mt-3">User experience gamification android investor assets ramen niche market bandwidth entrepreneur sales</Typography>
            </Container>
          </Grid2>
          <Grid2 className="w-full">
            <MainTable />
          </Grid2>
        </Grid2>
      </MainLayout>
    </div>
  );
};

export default Home;
