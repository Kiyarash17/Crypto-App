import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CoinsApi } from "../../pages/api/swagger/api";
import { useEffect, useState } from "react";

export default function CoinsList() {
  // const [data, setData] = useState([""]);

  // useEffect(() => {
  //   new CoinsApi().coinsListGet({ includePlatform: true })
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  // console.log(data);
  
  // // async () => {
  // //   const response = await new CoinsApi().coinsListGet({ includePlatform: true });
  // //   const data = await response.json();
  // //   setData(data);
  // // };

  // const colums: GridColDef[] = [
  //   {field: "id", headerName: "ID", width: 70 },
  //   {field: "name", headerName: "Name", width: 180 },
  //   {field: "symbol", headerName: "Symbol", width: 150}
  // ];

  // // const rows = [
  // //   data.map((val, index) => {
  // //     return(
  // //       {id: {index}, name: {val.name}, symbol: {val.symbol}}
  // //     );
  // //   })
  // // ]



  // return (
  //   // <div>
  //   //   <DataGrid 
  //   //   columns={colums}
  //   //   rows={rows}
  //   //   />
  //   // </div>
  //   <Table>
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>ID</TableCell>
  //         <TableCell>Name</TableCell>
  //         <TableCell>Symbol</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {
  //         data.map((val, index) => {
  //           return(
  //             <TableRow className="text-white" key={val.id}>
  //               <TableCell className="text-white">{index}</TableCell>
  //               <TableCell className="text-white">{val.name}</TableCell>
  //               <TableCell className="text-white">{val.symbol}</TableCell>
  //             </TableRow>
  //           );
  //         })
  //       }
  //     </TableBody>
  //   </Table>
  // );
}
