import {
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography
} from "@mui/material";
import Link from "next/link";


const items = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "NFT Arts",
    href: "/HeaderPages/NFTArts",
  },
  {
    title: "Trading",
    href: "/HeaderPages/Trading",
  },
  {
    title: "CryptoCurrency",
    href: "/HeaderPages/CryptoCurreny",
  },
  {
    title: "About Us",
    href: "/HeaderPages/AboutUs",
  },
];

type Props = {
  open: any;
  setOpen: any;
};

export default function MobileDrawer(props: Props) {

  const drawer = (
    <div className="w-72">
      <Typography variant="h6" align="center">Menu</Typography>
      <Divider />
      <List>
        {items.map((val, index) => {
          return (
            <Link href={val.href} key={index}>
              <a>
                <ListItemButton>
                  <Typography variant="h6" className="font-bold">{val.title}</Typography>
                </ListItemButton>
              </a>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box className="w-full" component="nav">
        <Drawer 
          anchor="left" 
          open={props.open} 
          onClose={() => props.setOpen(false)} 
          variant="temporary" 
          PaperProps={{sx: {backgroundColor: "black", color: "white"}}}
          >
            {drawer}
        </Drawer>
    </Box>
  );
}
