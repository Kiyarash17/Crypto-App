import {
  Container,
  Typography,
  List,
  ListItemButton,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import telegram from "../../../public/media/telegram.png";
import instagram from "../../../public/media/instagram.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
    <div className="my-5">
      <div>
        <Container>
          <Grid2 container className="text-center w-full flex justify-center items-center">
            <Grid2 xs={12} md={3}>
                <Typography variant="h5">
                  INCRY<span className="text-emerald-400">PKO</span>
                </Typography>
            </Grid2>
            <Grid2 xs={12} md={6} className="xs:w-full md:w-auto text-center">
              <List className="w-full flex justify-center">
                {items.map((val, index) => {
                  return (
                    <Link href={val.href} key={index}>
                      <a>
                        <ListItemButton>
                          <Typography>{val.title}</Typography>
                        </ListItemButton>
                      </a>
                    </Link>
                  );
                })}
              </List>
            </Grid2>
            <Grid2 xs={12} md={3}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Link href="/">
                  <a>
                    <ListItemButton>
                      <Image
                        src={telegram}
                        alt="telegram"
                        width={20}
                        height={20}
                      />
                    </ListItemButton>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <ListItemButton>
                      <Image
                        src={instagram}
                        alt="instagram"
                        width={29}
                        height={25}
                      />
                    </ListItemButton>
                  </a>
                </Link>
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      </div>
      <div>
        <Grid2 xs={12} className="my-3">
          <Container className="md:w-11/12">
            <Typography align="center">
              Incrypko provides a fundamental analysis of the crypto market.
              In addition to tracking price, volume and market capitalisation,
              CoinGecko tracks community growth, open-source code development,
              major events and on-chain metrics
            </Typography>
          </Container>
        </Grid2>
      </div>
      <div>
        <Container className="text-center">
          <Typography align="center" variant="caption">
            &copy; All Rights Reserved
          </Typography>
        </Container>
      </div>
    </div>
  );
}
