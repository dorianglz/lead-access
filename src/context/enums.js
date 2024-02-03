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
    SIGNE: "Signé",
    SANS_STATUT: "Sans statut"
}

export const Region = {
    IDF: {
        display: "Ile-de-France / Hauts-de-France",
        CodePostal : ["75", "77", "78", "91", "92", "93", "94", "95"]
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
    AQUITAINE: {
        display: "Nouvelle-Aquitaine",
        CodePostal : ["87", "86", "79", "64", "47"]
    },
    AUVERGNE: {
        display: "Auvergne-Rhône-Alpes",
        CodePostal : ["74", "73", "69", "63", "43"]
    },
    BOURGOGNE: {
        display: "Bourgogne-Franche-Comté",
        CodePostal : ["90", "89", "71", "70", "58"]
    },
    GRANDEST: {
        display: "Grand Est",
        CodePostal : ["88", "68", "67", "57", "55"]
    },
    NORMANDIE: {
        display: "Normandie",
        CodePostal : ["76", "61", "50", "27", "14"]
    },
    REUNION: {
        display: "La Réunion",
        CodePostal : ["974"]
    },
    MARTINIQUE: {
        display: "Martinique",
        CodePostal : ["972"]
    },
    MAYOTTE: {
        display: "Mayotte",
        CodePostal : ["976"]
    },
    GUYANE: {
        display: "Guyane",
        CodePostal : ["973"]
    },
    GUADELOUPE: {
        display: "Guadeloupe",
        CodePostal : ["971"]
    },
    CORSE: {
        display: "Corse",
        CodePostal : ["2A", "2B"]
    },
    CENTREVAL: {
        display: "Centre-Val de Loire",
        CodePostal : ["45", "41", "37", "36", "28"]
    },
}