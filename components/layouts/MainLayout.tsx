import { Toolbar, Container, ListItemIcon, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Header from "./header/Header";
import MobileHeader from "./header/MobileHeader";
import Footer from "./footer/Footer";

type Props = {
  children: any;
};

export default function MainLayout(props: Props) {
  return (
    <Grid2>
      <Container>
        <Toolbar variant="dense">
          <Container className="w-full">
            <Grid2 className="hidden md:block">
              <Header />
            </Grid2>
            <Grid2 container className="block md:hidden">
              <MobileHeader />
            </Grid2>
          </Container>
        </Toolbar>
        <div>{props.children}</div>
      </Container>
      <div>
        <Footer />
      </div>
    </Grid2>
  );
}
