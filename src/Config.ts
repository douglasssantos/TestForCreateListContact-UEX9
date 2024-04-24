import {Contact, Credentials} from "./Types";

export const apiKeyGoogleMaps = 'API KEY GOOGLE MAPS';

export const credentialsAuthenticate: Credentials  = {
    username: 'admin',
    password: 123456,
    token: 'zSuczxjWA.$ad.123#$dapxASDkjXqbwZ.$e'
}

const contactsDefault = []


export const contacts: Contact[] = JSON.parse(localStorage.getItem("my-contacts") || JSON.stringify(contactsDefault));