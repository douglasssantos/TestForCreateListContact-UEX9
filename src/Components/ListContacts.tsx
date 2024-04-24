import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Stack,
    TextField, useMediaQuery, useTheme
} from "@mui/material";
import {Contact, ViaCep} from "../Types";
import ContactCard from "./ContactCard.tsx";
import {useState} from "react";
import {contacts as MyContacts, credentialsAuthenticate} from "../Config.ts";
import DialogContactForm from "./DialogContactForm.tsx";

const ListContacts = ({onSelectedContact}) => {

    const [contacts, setContacts]: Contact[] = useState(MyContacts || [])
    const [dialog, setDialog]: boolean = useState(false);
    const [search, setSearch]: string = useState('');

    const handleLogout = () => {

        localStorage.removeItem('user')

        window.location.reload();

    }


    const addContact = (data) => {

        const allContacts: Contact[] = [...contacts];

        allContacts.push(data)

        setContacts(allContacts);

        setDialog(false);

        localStorage.setItem("my-contacts", JSON.stringify(allContacts));

    }


    const removeContact = (index) => {

        const allContacts: Contact[] = [...contacts];

        allContacts.splice(index, 1);

        setContacts(allContacts);

        localStorage.setItem("my-contacts", JSON.stringify(allContacts));

    }

    const validateFilter = () => {

        return contacts?.filter((contact : Contact) => {

            const {fullname, email, cpf, address, phone} = contact;

            const keywords = (fullname+'|'+email+'|'+cpf+'|'+address+'|'+phone).toString().toLowerCase();

            return search === '' ? true : keywords.includes(search.toLowerCase());
        });

    }

    //position:'fixed', left:0, bottom: 0,

    return (
            <Stack
                style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    backgroundColor: '#FFF',
                    padding:10,
                    margin:0,
                    boxShadow:"#000 0px 0px 0.70em"
                }}
                direction="column"
                spacing={0}>

                <TextField
                    fullWidth
                    id="filled-textarea"
                    label="Buscar Contato"
                    variant="filled"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <Divider style={{marginTop:20}}/>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    style={{minWidth: 320,height:'100%', color:'#333', paddingTop: 20, margin:0, overflowY: 'visible'}}>

                    {
                        validateFilter().map(
                            (contact : Contact, index : number) => <ContactCard
                                key={index}
                                data={index}
                                fullname={contact.fullname}
                                email={contact.email}
                                onClick={() => onSelectedContact(contact)}
                                onDelete={removeContact}
                            />)
                    }

                    <DialogContactForm
                        show={dialog}
                        onUpdate={addContact}
                        onClose={() => {setDialog(false)}}
                    />

                </Stack>

                <Button
                    style={{minWidth:320,  borderRadius:0, padding: '10px 0px'}}
                    variant='contained'
                    onClick={() => {setDialog(true)}}
                >Novo Contato</Button>
                <Button
                    style={{minWidth:320,  borderRadius:0, padding: '10px 0px', marginTop:10}}
                    variant='contained' color='error'
                    onClick={handleLogout}
                >Deslogar</Button>
            </Stack>
    )

}

export default ListContacts