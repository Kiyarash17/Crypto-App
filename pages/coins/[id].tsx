import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { useRouter } from "next/router";
import Chart from "../../components/chart/Chart";
import Link from "next/link";

export default function Coin() {
  const [data, setData] = useState<any>([""]);
  const router = useRouter();
  const coin = router.query.id;

  useEffect(() => {
    new Api().coins
      .coinsDetail(coin?.toString()!)
      .then((res) => res.json())
      .then((data) => setData(data));
  });

  return (
    <div>
      {/* <Typography align="center">{data.description.EN}</Typography> */}
      <Grid xs={12}>
        <Grid xs={6}>
          <Grid className="flex">
            <img src={data?.image?.small} alt="Crypto" />
            <Typography variant="h2">{data.name}</Typography>
          </Grid>
          <Typography>{data.price}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography align="center" variant="h2">
            Information
          </Typography>
          <Typography>Link: {data.links?.homepage[0]}</Typography>
          <Typography>Rank: {data.market_cap_rank}</Typography>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Chart id={coin} />
      </Grid>
    </div>
  );
}
