import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "./footer/Footer";
import Header from "./header/Header";

type Props = {
    children: any
}

export default function MainLayout(props: Props) {
    return(
        <Grid>
            <Container>
                <section>
                    <Header />
                </section>
                <section>
                    {props.children}
                </section>
                <section>
                    {/* <Footer /> */}
                </section>
            </Container>
        </Grid>
    );
}