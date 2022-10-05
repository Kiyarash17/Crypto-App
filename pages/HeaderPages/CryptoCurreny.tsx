import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Typography, Box, IconButton, useTheme } from "@mui/material";
import { LastPage, FirstPage } from "@mui/icons-material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Api } from "../api/Api";
import MainLayout from "../../components/layouts/MainLayout";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginatioAction(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const {count , page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page -1);
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return(
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
    </Box>
  );

}






export default function Cryptocurrency() {
  const [data, setData] = useState([""]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) =>  setPage(newPage);
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    new Api().coins
      .marketsList({ vs_currency: "usd", price_change_percentage: "24h" })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <MainLayout>
        <Container className="mt-10">
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
              {data.map((val: any, index) => {
                return (
                  <TableRow key={val.id}>
                    <TableCell className="border-0 text-white">{index + 1}</TableCell>
                    <TableCell className="border-0 text-white flex">
                      <img src={val.image} alt="Crypto" width={20} height={20}/>
                      <Typography className="mx-3">{val.name}</Typography>
                      <Typography className="text-slate-300">{String(val.symbol).toUpperCase()}</Typography>
                    </TableCell>
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
                <TablePagination
                  className="text-white"
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
    </MainLayout>
  );
}
