import { Grid, Container, List, ListItemButton, Typography } from "@mui/material";
import Link from "next/link";
import HeaderCollapse from "./HeaderCollaps";

export default function Header() {
  const items = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "NFT Arts",
      href: "/Pages/NFTArts",
    },
    {
      title: "Trading",
      href: "/Pages/Trading",
    },
    {
      title: "Cryptocurrency",
      href: "/Pages/CryptoCurreny",
    },
    {
      title: "About us",
      href: "/Pages/AboutUs",
    },
  ];

  return (
    <Grid>
      <Container className="flex justify-between pt-3">
        <section className="pt-4">
            <Typography variant="h5">INCRY<span className="text-emerald-400">PKO</span></Typography>
        </section>
        <section>
          <List className="flex">
            {items.map((val, index) => {
              return (
                <Link href={val.href} key={index}>
                  <a>
                    <ListItemButton>
                      <Typography variant="inherit">{val.title}</Typography>
                    </ListItemButton>
                  </a>
                </Link>
              );
            })}
          </List>
        </section>
        <section>
            <HeaderCollapse />
        </section>
      </Container>
    </Grid>
  );
}
