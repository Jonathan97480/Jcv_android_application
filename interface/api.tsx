import { Attributes } from "react";

export interface apiCategories {

    id: number;
    attributes: {
        nom: string;
        description: string;
        color: string;
        sous_categories: {
            data: {

                id: number,
                attributes: {
                    name: string;
                    image: {
                        data: {
                            id: number;
                            attributes: {
                                url: string;
                            }
                        }
                    }
                }
            }[]
        }
    }
}

export interface apiProduct {

    id: number;
    attributes: {
        nom: string;
        description: string;
        classe_energetique: string | null,
        disponibilite: boolean,
        indice_reparabilite: number,
        capacite: string | null,
        alimentation: string,
        garantie: string,
        poids: string,

        images: {
            data: picData[]
        },
        dimension: {
            height: number;
            width: number;
        },
        category: {
            data: {
                attributes: {
                    nom: string;
                    color: string;

                }
            }
        },
        sous_categories: {
            data: {
                attributes: {
                    name: string;

                }
            }[]
        }, documentation: {
            data: {
                id: number;
                attributes: {
                    url: string;
                }
            }[]
        }

    },
}

export interface picData {
    attributes: {

        url: string;

    }
}

export interface apiNotification {
    id: number;
    description: string;
    title: string;
    repeated: boolean;
    isValidated: boolean;
    date: string;
}