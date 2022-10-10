import {Container, Typography, ListItemIcon,} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MenuIcon from '@mui/icons-material/Menu';
import MobileDrawer from "../mobile/MobileDrawer";
import { useState } from "react";

export default function MobileHeader() {
    const [open, setOpen] = useState<boolean>(false)

    return(
        <div>
            <Grid2 className="w-full">
                <Container className="flex justify-between">
                      <Typography variant="h5">INCRY<span className="text-emerald-400">PKO</span></Typography>
                      <ListItemIcon onClick={() => setOpen(!open)}>
                        <MenuIcon className="text-white"/>
                      </ListItemIcon>
                </Container>
            </Grid2>
            <MobileDrawer open={open} setOpen={setOpen} />
        </div>
    );
}