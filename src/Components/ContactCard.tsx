import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import {ContactCardType} from "../Types";
import {IconButton, ListItem, ListItemButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export default function ContactCard({ fullname, email, onDelete, data, onClick }: ContactCardType) {

    const getFirstAndLastLetterName = () => {

        const name = fullname.split(' ');

        return (name[0]?.substring(0,1)+name[1]?.substring(0,1)).toUpperCase();

    }

    return (
        <Card>
            <ListItem
                onClick={() => onClick()}
                style={{padding:0, margin: 0, width:350}}
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                            if(onDelete) onDelete(data)
                        }}
                    >
                        <Delete />
                    </IconButton>
                }>
            <ListItemButton style={{padding:0}}>
            <CardHeader
                avatar={ <Avatar sx={{ bgcolor: red[500], fontSize:16 }} aria-label="recipe"> {getFirstAndLastLetterName()} </Avatar> }
                title={fullname}
                subheader={email}
            />
            </ListItemButton>
            </ListItem>
        </Card>
    );
}