import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

type Props = {
  data: any;
};

export default function CoinData(props: Props) {
  console.log(props.data);

  return (
    <Grid2 className="w-auto h-auto">
      <Grid2 className="flex">
        <img src={props.data?.image?.small} alt="Crypto" />
        <Typography variant="h2" className="mx-3">
          {props.data.name}
        </Typography>
        <Typography variant="h4" className="text-slate-300 flex items-center">
          {props.data.symbol?.toUpperCase()}
        </Typography>
      </Grid2>
      <Grid2 className="flex items-center">
        <Typography variant="h2" className="mx-5 text-slate-200">
          {props.data?.market_data.current_price.usd + "$"}
        </Typography>
        <Typography
          variant="h5"
          className={
            Number(props.data.market_data.market_cap_change_percentage_24h) >= 0
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {props.data.market_data.market_cap_change_percentage_24h.toFixed(1) + "%"}
        </Typography>
      </Grid2>
      <Typography variant="h6" className="ml-5">
        Rank: {props.data.market_cap_rank}
      </Typography>
    </Grid2>
  );
}
