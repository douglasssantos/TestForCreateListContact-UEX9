import {
    Box,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField, useMediaQuery, useTheme
} from "@mui/material";
import {Contact, ViaCep} from "../Types";
import {useState} from "react";
import {fromAddress, setDefaults} from "react-geocode";
import {apiKeyGoogleMaps} from "../Config.ts";

const DialogContactForm = ({show, onUpdate, onClose}) => {

    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
    const [contactData, setContactData]: Contact = useState({})

    setDefaults({
        key: apiKeyGoogleMaps, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
    });

    const getGeolocation = (data: ViaCep) => {

        const { logradouro, complemento, bairro, localidade, uf} = data;

        const address = `${logradouro} ${contactData?.address.number}, ${complemento}, ${bairro}, ${localidade} - ${uf}/BR`

        fromAddress(address)
            .then(({ results }) => {

                const { lat, lng } = results[0]?.geometry?.location;

                setContactData((contact : Contact) => ({...contact, location: { text: address, long: lng, lat: lat}}))

                console.log(lat, lng, contactData);
            })
            .catch(console.error)

    }

    const setData = (key: string, value: any) => {
        setContactData((values: Contact) => ({...values, [key]: value}))
    }

    const setAddressData = (key: string, value: any) => {
        setContactData((values: Contact) => ( {...values, address: { ...values.address,  [key]: value } } ) );
    }

    const  handleCpfChange = (value: string) => {

        const cpf = value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        setData('cpf', cpf)
    }

    const handleSetPostalCode = async (value: string) => {

        try {

            const postalCode = value.replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')

            setAddressData('postalCode', postalCode);

            if (postalCode.length >= 9) {

                fetch(`https://viacep.com.br/ws/${postalCode.replace('-', '')}/json/`)
                    .then(response => response.json())
                    .then((data: ViaCep) => {
                        setAddressData('street', data.logradouro)
                        setAddressData('complement', data.complemento)
                        setAddressData('district', data.bairro)
                        setAddressData('city', data.localidade)
                        setAddressData('state', data.uf)
                        setAddressData('country', 'BR');

                        getGeolocation(data);
                    });
            }

        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Dialog
        fullScreen={fullScreen}
        open={show}
        >
        <DialogTitle id="responsive-dialog-title">Cadastro de novo contato</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Para cadastrar um novo contato preencha os dados abaixo.
            </DialogContentText>
            <Box>
                <TextField
                    style={{marginTop:20}}
                    sx={{minWidth:500}}
                    sm={{minWidth:250}}
                    id="filled-textarea"
                    label="Nome Completo"
                    fullWidth
                    multiline
                    variant="filled"
                    value={contactData.fullname}
                    onChange={(e) => {
                        setData('fullname', e.target.value)
                    }}
                />
                <Stack
                    direction={'row'}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2} >
                    <TextField
                        style={{marginTop:20}}
                        fullWidth
                        sx={{minWidth:200}}
                        id="filled-textarea"
                        label="CPF"
                        variant="filled"
                        value={contactData.cpf}
                        onChange={(e) => {
                            handleCpfChange(e.target.value)
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        sx={{minWidth:320}}
                        fullWidth
                        id="filled-textarea"
                        label="E-mail"
                        variant="filled"
                        value={contactData.email}
                        onChange={(e) => {
                            setData('email', e.target.value)
                        }}
                    />
                </Stack>
                <TextField
                    style={{marginTop:50}}
                    sx={{minWidth:500}}
                    sm={{minWidth:250}}
                    id="filled-textarea"
                    label="Cep"
                    fullWidth
                    variant="filled"

                    value={contactData?.address?.postalCode}
                    onChange={(e) => {
                        handleSetPostalCode(e.target.value)
                    }}
                />

                <Stack
                    direction={'row'}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2} >
                    <TextField
                        style={{marginTop:20}}
                        sx={{minWidth:370}}
                        id="filled-textarea"
                        label="Rua"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.street}
                        onChange={(e) => {
                            setAddressData('street', e.target.value)
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        sx={{minWidth:70}}
                        id="filled-textarea"
                        label="Número"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.number}
                        onChange={(e) => {
                            setAddressData('number', e.target.value)
                        }}
                    />
                </Stack>

                <Stack
                    direction={'row'}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2} >
                    <TextField
                        style={{marginTop:20}}
                        id="filled-textarea"
                        label="Complemento"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.complement}
                        onChange={(e) => {
                            setAddressData('complement', e.target.value)
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        id="filled-textarea"
                        label="Bairro"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.district}
                        onChange={(e) => {
                            setAddressData('district', e.target.value)
                        }}
                    />
                </Stack>

                <Stack
                    direction={'row'}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2} >
                    <TextField
                        style={{marginTop:20}}
                        id="filled-textarea"
                        label="Cidade"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.city}
                        onChange={(e) => {
                            setAddressData('city', e.target.value)
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        id="filled-textarea"
                        sx={{maxWidth:100}}
                        label="Estado"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.state}
                        onChange={(e) => {
                            setAddressData('state', e.target.value)
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        id="filled-textarea"
                        sx={{maxWidth:70}}
                        label="País"
                        fullWidth
                        variant="filled"
                        value={contactData?.address?.country}
                        onChange={(e) => {
                            setAddressData('country', e.target.value)
                        }}
                    />
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {

                if(onClose)
                    onClose(true)

            }}>Cancelar</Button>
            <Button autoFocus variant='contained' onClick={() => {

                if(onUpdate)
                    onUpdate(contactData)

            }}>Cadastrar</Button>
        </DialogActions>
    </Dialog>
    )


}

export default DialogContactForm