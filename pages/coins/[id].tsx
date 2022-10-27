import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CoinData from "../../components/data/CoinData";
import Chart from "../../components/chart/Chart";
import { useRouter } from "next/router";
import { Api } from "../api/Api";
import MainLayout from "../../components/layouts/MainLayout";

export async function getServerSideProps(context: any) {
  const CoinName = context.query.id;
  const res = await new Api().coins.coinsDetail(CoinName);
  const data = await res.json();

  return {
    props: {
      data,
      CoinName,
    },
  };
}

type Props = {
  data: any;
  CoinName: string,
};

export default function Coin(props: Props) {
  // const [data, setData] = useState<any>([""]);
  // const router = useRouter();
  // const coin = router.query.id;

  return (
    <MainLayout>
      <Grid2 container className="my-8">
        <Grid2 xs={12}>
          <CoinData data={props.data} />
        </Grid2>
        <Grid2 xs={12} className="mt-7">
          <Chart id={props.CoinName} />
        </Grid2>
      </Grid2>
    </MainLayout>
  );
}
