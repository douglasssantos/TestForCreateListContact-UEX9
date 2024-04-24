export type Credentials = {
    username: string,
    password: string | number
}

export type Contact = {
    fullname: string,
    cpf?: string,
    phone?: string,
    email: string,
    address?: {
        postalCode?: string | number,
        street?: string,
        number?: string | number,
        complement?: string,
        district?: string,
        city?: string,
        state?: string,
        country?: string,
    }
    location?: {
        text?: string,
        long?: number,
        lat?: number,
    }
}

export type ViaCep = {
    cep?: string
    logradouro?: string
    complemento?: string
    bairro?: string
    localidade?: string
    uf?: string
    ddd?: string
    gia?: string
    ibge?: string
    siafi?: string
}

export type ContactCardType = {
    fullname: string,
    email?: string | null,
    onDelete?: () => void,
    data?: any,
}

export type GoogleMapsProps = {
    fullname?: string
    lat?:any,
    long?:any,
    zoom: number
}