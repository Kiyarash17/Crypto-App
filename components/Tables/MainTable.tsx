import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import nem from "../../public/logos/Nem.png";
import ethereum from "../../public/logos/Ethereum.png";
import Image from "next/image";
import bitcoin from "../../public/logos/Bitcoin.png";

export default function MainTable() {

    const items = [
        {
            name: "Bitcoin",
            id: "BTC",
            imgSrc: bitcoin,
            price: "$33,592.99",
            change: +4.3,
            marketCap: "$635.14B"
        },
        {
            name: "Ethereum",
            id: "ETH",
            imgSrc: ethereum,
            price: "$2,274.19",
            change: +2.1,
            marketCap: "$267.12B"
        },
        {
            name: "Nem",
            id: "XEM",
            imgSrc: nem,
            price: "$0.0414",
            change: -1.7,
            marketCap: "$57.16B"
        }
    ]

    return(
        <div>
            <Typography className="mt-0" align="center" variant="h3">Top Currencies</Typography>
            <Typography align="center" variant="subtitle2" className="px-80 mt-3">User experience gamification android investor assets ramen niche market bandwidth entrepreneur sales</Typography>
            <Table className="mt-5 border-solid border-gray border-1 rounded-t-2xl bg-neutral-900 border-b-0 border-separate">
                <TableHead className="border-1 border-solid border-gray">
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
                        items.map((val: any, index) => {
                            return(
                                <TableRow key={val.id} className="border-0">
                                    <TableCell className="text-white border-0">{index + 1}</TableCell>
                                    <TableCell className="text-white flex border-0">
                                        <Image src={val.imgSrc} alt="Coin" width={20} height={20}/>
                                        <Typography className="mx-3">{val.name}</Typography>
                                        <Typography className="text-slate-300">{val.id}</Typography>
                                    </TableCell>
                                    <TableCell className="text-white border-0">{val.price}</TableCell>
                                    <TableCell className={parseFloat(val.change) >= 0 ? "text-green-600 border-0" : "text-red-600 border-0"}>{val.change + "%"}</TableCell>
                                    <TableCell className="text-white border-0">{val.marketCap}</TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
}