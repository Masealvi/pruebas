
export interface IndicadorGraficos {
    codigoIndicador: string;
    nombreIndicador: string;
    dimensiones:     string[];
    unidadMedida:    string[] | null;
    series:          Array<Array<number | string> | number | string>;
    data:            Data[];
}

export interface Data {
    tabla:       null;
    dimensiones: string[];
    unidadMedida:    string[];
    series:      Array<Array<number | string>>;
}