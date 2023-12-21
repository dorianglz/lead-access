export const UserType = {
    MANAGER: "Manager",
    USER: "Collaborateur",
    ADMIN: "Admin"
}

export const LeadStatus = {
    NRP: "NRP",
    RAPPELER: "A rappeler",
    INTERESSE: "Intéressé",
    RDV_PRIS: "RDV pris",
    PAS_INTERESSE: "Pas intéressé",
    NULL: "Nul",
    FAKE_NUM: "Faux numéro",
    SIGNE: "Signé"
}

export const Region = {
    IDF: {
        display: "Ile-de-France / Hauts-de-France",
        CodePostal : ["91", "92", "93", "94", "95"]
    },
    PACA: {
        display: "Provence-Alpes-Côte d’Azur",
        CodePostal : ["84", "83", "04", "05", "06", "13"]
    },
    LOIRE: {
        display: "Pays de la Loire",
        CodePostal : ["85", "72", "53", "49", "44"]
    },
    BRETAGNE: {
        display: "Bretagne",
        CodePostal : ["56", "35", "29", "22"]
    },
    OCCITANIE: {
        display: "Occitanie",
        CodePostal : ["82", "81", "66", "65", "48"]
    },
}