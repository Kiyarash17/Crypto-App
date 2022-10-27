import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Api } from "../api/Api";
import MainLayout from "../../components/layouts/MainLayout";

export async function getServerSideProps() {
  const res = await new Api().coins.marketsList({
    vs_currency: "usd",
    price_change_percentage: "24h",
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

type Props = {
  data: any;
};

export default function CryptoCurrency(props: Props) {
  return (
    <MainLayout>
      <Grid className="w-full my-5">
        <Table className="bg-neutral-900 border-solid border-1 border-gray rounded-2xl border-separate">
          <TableHead>
            <TableRow>
              <TableCell className="text-neutral-500 font-bold">#</TableCell>
              <TableCell className="text-neutral-500 font-bold">Name</TableCell>
              <TableCell className="text-neutral-500 font-bold">
                Price
              </TableCell>
              <TableCell className="text-neutral-500 font-bold">
                Change
              </TableCell>
              <TableCell className="text-neutral-500 font-bold">
                Market Cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.map((val: any) => {
              return (
                <Link href={`../coins/${val.id}`} key={val.id}>
                  <TableRow className="cursor-pointer hover:bg-neutral-800">
                    <TableCell className="border-0 text-white">
                      {val.market_cap_rank}
                    </TableCell>
                    <TableCell className="border-0 text-white flex">
                      <img
                        src={val.image}
                        alt="Crypto"
                        width={20}
                        height={20}
                      />
                      <Typography className="mx-3">{val.name}</Typography>
                      <Typography className="text-slate-300">
                        {String(val.symbol).toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell className="border-0 text-white">
                      {val.current_price + "$"}
                    </TableCell>
                    <TableCell
                      className={
                        parseFloat(val.market_cap_change_percentage_24h) >= 0
                          ? "text-green-600 border-0"
                          : "text-red-600 border-0"
                      }
                    >
                      {Number(val.market_cap_change_percentage_24h).toFixed(1) +
                        "%"}
                    </TableCell>
                    <TableCell className="border-0 text-white">
                      {Number(val.market_cap / 1000000000).toFixed(2) + "B"}
                    </TableCell>
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    </MainLayout>
  );
}
