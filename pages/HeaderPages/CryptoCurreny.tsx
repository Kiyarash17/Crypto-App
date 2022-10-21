import { Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Link from "next/link";
import { Api } from "../api/Api"

export default function CryptoCurrency() {
  const [data, setData] = useState([""]);

  useEffect(() => {
    new Api().coins
      .marketsList({ vs_currency: "usd", price_change_percentage: "24h" })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Grid className="w-full">
      <Container>
          <Table className="bg-neutral-900 border-solid border-1 border-gray rounded-2xl border-separate">
            <TableHead>
              <TableRow>
                <TableCell className="text-neutral-500 font-bold">#</TableCell>
                <TableCell className="text-neutral-500 font-bold">Name</TableCell>
                <TableCell className="text-neutral-500 font-bold">Price</TableCell>
                <TableCell className="text-neutral-500 font-bold">Change</TableCell>
                <TableCell className="text-neutral-500 font-bold">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              data.map((val: any) => {
                return (
                  <TableRow key={val.id}>
                    <TableCell className="border-0 text-white">{val.market_cap_rank}</TableCell>
                    <Link href={`../coins/${val.id}`}>
                      <a>
                        <TableCell className="border-0 text-white flex">
                          <img src={val.image} alt="Crypto" width={20} height={20}/>
                          <Typography className="mx-3">{val.name}</Typography>
                          <Typography className="text-slate-300">{String(val.symbol).toUpperCase()}</Typography>
                        </TableCell>
                      </a>
                      </Link>
                    <TableCell className="border-0 text-white">{val.current_price + "$"}</TableCell>
                    <TableCell
                      className={
                        parseFloat(val.market_cap_change_percentage_24h) >= 0
                          ? "text-green-600 border-0"
                          : "text-red-600 border-0"
                      }
                    >
                      {Number(val.market_cap_change_percentage_24h).toFixed(1) + "%"}
                    </TableCell>
                    <TableCell className="border-0 text-white">{Number(val.market_cap / 1000000000).toFixed(2) + "B"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </Container>
    </Grid>
  );
}