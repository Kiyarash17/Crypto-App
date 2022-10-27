import { Typography, Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import MainPage from "../components/layouts/MainPage";
import MainTable from "../components/Tables/MainTable";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Api } from "./api/Api";


export async function getServerSideProps() {

  const res = await new Api().coins.marketsList({ vs_currency: "usd", price_change_percentage: "24h" });
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}

type Props = {
  data: any;
}

const Home: NextPage<Props> = (props) => {
  return (
    <div>
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
            <MainTable data={props.data} />
          </Grid2>
        </Grid2>
      </MainLayout>
    </div>
  );
};

export default Home;

