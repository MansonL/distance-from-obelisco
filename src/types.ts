export interface IAddressQuery {
  calle: string;
  altura: number;
  provincia: string;
  departamento?: string;
}

export interface IAddressesResponse {
    cantidad: number;
    inicio: number;
    // Parameters object not really necessary for now...
    parametros: any;
    total: number;
    direcciones: IAddressResponse[];
}

export interface IAddressResponse {
    altura: {
        unidad: string | null;
        valor: number;
    },
    calle?: {
        categoria: string | null;
        id: number | null;
        nombre: string;
    }
    calle_cruce_1?: calle_cruce;
    calle_cruce_2?: calle_cruce
    calles?: string[];
    departamento?: string | {
        id: number;
        nombre: string;
    }
    piso: any;
    nomenclatura: string;
    provincia?: {
        id: number;
        nombre: string;
    }
    localidad_censal?: {
        id: number;
        nombre: string;
    }

}

type calle_cruce = {
    categoria: string | null;
    id: number | null;
    nombre: string | null;
}