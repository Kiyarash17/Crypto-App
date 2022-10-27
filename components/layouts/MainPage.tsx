import { Typography, List, ListItem, ListItemButton,  Container } from "@mui/material";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import Image from "next/image";
import Monkey from "../../public/NFT/MonkeyNFT.png"
import Kiyarash from "../../public/Artists/Kiyarash.jpg"
import Grid from "@mui/material/Grid";

export default function MainPage() {
  return (
    <Grid container className="w-full lg:h-[85vh]">
      <Container className="flex justify-around mt-10 w-full">
        <Grid item className="mr-0 md:mr-48">
          <Typography variant="h2">
            Invest In Digital Art & Crypto Earn{" "}
            <span className="border-b-8 border-solid border-x-0 border-t-0 border-emerald-400 ">
              Passive
            </span>{" "}
            Money
          </Typography>
          <Typography variant="subtitle2" className="mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et doloremque quia laudantium? Quasi blanditiis soluta impedit ullam incidunt aliquam, itaque cum quisquam voluptate.
          </Typography>
          <List className="flex mt-10">
            <ListItem className="w-auto">
              <ListItemButton className="bg-emerald-400 rounded-md text-black font-bold">Start Investing</ListItemButton>
            </ListItem>
            <ListItem className="w-auto">
              <ListItemButton>
                <PlayCircleOutlineOutlinedIcon className="text-emerald-400 mr-2" />
                <Typography variant="button">How It Works</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item>
          <div className="rounded-md bg-neutral-900 text-center w-64 h-auto border-solid border-gray-700">
            <Image src={Monkey} alt="Monkey NFT" className="rounded-md text-center my-5" width={220} height={220}/>
            <div className="mt-5">
              <Typography variant="subtitle1" align="left" className="ml-5">The Metapuffers 3.0</Typography>
              <Typography align="left" className="ml-5 text-slate-200 text-[0.7rem]">Lorem ipsum dolor sit, amet consectetur</Typography>
            </div>
            <div className="flex ml-5 my-3">
              <Image src={Kiyarash} alt="Artist" width={40} height={40} className="rounded-full"/>
              <div className="ml-1">
                <Typography className="text-[0.6rem]">Name of Artist</Typography>
                <Typography className="text-[0.8rem] mt-1 font-bold">@Kiyarash17</Typography>
              </div>
              <div className="ml-3">
                <Typography className="text-[0.6rem]">Current Bid</Typography>
                <Typography className="text-emerald-400">18.67 ETH</Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </Grid>
  );
}
