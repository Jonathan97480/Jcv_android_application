

export interface Customer {
    id: number;
    attributes: {
        nom: string;
        prenom: string;
        statut: string;
        email: string | null;
        telephone: number | null;
        address: string | null;
        ville: string | null;
        code_postal: string | null;
        telephone_mobile: number | null;
        faxe: number | null;
        description: string | null;
    }
}