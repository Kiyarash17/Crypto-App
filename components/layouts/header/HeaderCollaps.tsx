import {List, ListItemButton, Collapse, Typography, Button } from "@mui/material"
import { useState } from "react";


const languages = ["English", "Persion", "Deutsch", "French", "Arabic"];

export default function HeaderCollapse() {
    const [open, setOpen] = useState(false);

    const handleClick = (newOpen: boolean) =>{
        setOpen(open === newOpen ? false : newOpen)
    }

    return(
        <div className="flex">
            <List>
                <ListItemButton onClick={() => handleClick(true)}>
                    <Typography variant="button">Language</Typography>
                </ListItemButton>
                <Collapse in={open === true}>
                {
                    languages.map((language, index) => {
                        return(
                            <ListItemButton key={index}>
                                <Typography>{language}</Typography>
                            </ListItemButton>
                        );
                    })
                }        
                </Collapse>
            </List>
            <Button>
                <Typography variant="button" className="text-white border-2 border-solid border-emerald-400 rounded-[3rem] px-3 py-1">Login</Typography>
            </Button>
        </div>
    );
}