
import {
    Button,
    Stack, Box, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Dialog, useMediaQuery, useTheme
} from "@mui/material";
import {useState} from "react";
import {Credentials} from "../Types";
import {credentialsAuthenticate} from "../Config.ts";

const Login = () => {

    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));

    const [user, setUser]: Credentials = useState();
    const [error, setError]: string | null = useState(null)

    const handleLogin = () => {

        setError(null)

        if(user?.username.toString() === credentialsAuthenticate.username.toString()
            && user?.password.toString() === credentialsAuthenticate.password.toString() ){

            localStorage.setItem('user', JSON.stringify({token: credentialsAuthenticate?.token, isLogged: true}))

            window.location.reload();

            return true;

        }

        setError('Usuário ou senha inválida.')

    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
        >
            <DialogTitle id="responsive-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para entrar preencha os dados abaixo.
                </DialogContentText>
                <Box>
                    <TextField
                        style={{marginTop:20}}
                        sx={{minWidth:100}}
                        sm={{minWidth:100}}
                        id="filled-textarea"
                        label="Nome de Usuário"
                        fullWidth
                        multiline
                        variant="filled"
                        value={user?.username}
                        onChange={(e) => {
                            setUser({...user, username: e.target.value})
                        }}
                    />
                    <TextField
                        style={{marginTop:20}}
                        fullWidth
                        sx={{minWidth:100}}
                        id="filled-textarea"
                        label="Senha"
                        variant="filled"
                        value={user?.password}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                    />

                    { error && <span style={{marginTop:40, marginBottom:20, color: 'red'}}>{error}</span> }

                </Box>
            </DialogContent>
            <DialogActions style={{padding:25, paddingTop:20}}>
                <Button variant='contained' onClick={handleLogin}>Entrar</Button>
            </DialogActions>
        </Dialog>
);
}

export default Login;