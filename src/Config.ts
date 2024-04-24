import {Contact, Credentials} from "./Types";

export const apiKeyGoogleMaps = 'AIzaSyCqbxEdOd0RMDDeVyKSyYZuQ9w8Bx6aTBk';

export const credentialsAuthenticate: Credentials  = {
    username: 'admin',
    password: 123456,
    token: 'zSuczxjWA.$ad.123#$dapxASDkjXqbwZ.$e'
}

const contactsDefault = [{fullname: 'Douglas Santos', email: "douglassantos2127@gmail.com"},{fullname: 'Douglas Santos', email: "douglassantos2127@gmail.com"}]


export const contacts: Contact[] = JSON.parse(localStorage.getItem("my-contacts") || JSON.stringify(contactsDefault));