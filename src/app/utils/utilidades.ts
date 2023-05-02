import Swal from 'sweetalert2';
import { ITEM_PERU } from './constantes';
export class Utilidades {

    public static replaceWordsByKeys(cadena: string, searchKey: string[], replaceValue: string = ""): string {
        searchKey.forEach(e => { cadena = cadena.replace(e, replaceValue); });
        return cadena;
    }

    public static getYears(data: any[], position: number) {
        var array: any[] = [...new Set(data.map(e => e[position]))];
        return array;
    }

    public static getCountries(data: any[], position: number) {
        let posCode: number = 2;
        var array_name: any[] = [...new Set(data.map(e => e[position]))];
        var array_data: any[] = [];
        array_name.forEach((e) => {
            data.filter((s) => {
                if (s[position] == e) {
                    if (!array_data.find(nombre => nombre.name === e)) {
                        array_data.push({ code: s[posCode], name: `${e}` });
                    }
                }
            });
        });
        array_data.sort((x, y) => x.name.localeCompare(y.name));
        array_data = array_data.filter(item => item.code !== ITEM_PERU.code)
        return array_data;
    }

    public static getMensajeModal(message: string, type: any) {
        Swal.fire('Mensaje del Sistema', message, type);
    }

    public static removeChip(chips: any[], seleccionado: any, paises: any, anios: any): void {
        let index = chips.indexOf(seleccionado);
        if (index >= 0) {
            chips.splice(index, 1);
            if (paises.value?.length > 0) {
                index = paises.value.findIndex((e: any) => e === seleccionado.valor);
                if (index >= 0) {
                    paises.value.splice(index, 1);
                    paises.patchValue(paises.value);
                }
            }
            if (anios.value?.length > 0) {
                index = anios.value.findIndex((e: any) => e === seleccionado.valor);
                if (index >= 0) {
                    anios.value.splice(index, 1);
                    anios.patchValue(anios.value);
                }
            }
        }
    }

    public static orderArray(data: any, position: number) {
        return data.sort((a: any, b: any) => b[position] - a[position]);
    }

    public static procesarDataChart(aFiltro: any[]): any[] {
        let colCodPais = 2;
        var lPais = Array.from(new Set([...(aFiltro.map(e => e[colCodPais]))]));
        lPais.forEach(p => {
            var items = aFiltro.filter(e => e[colCodPais] === p);
            if (items !== null && items.length > 1) {
                const tot = items.length;
                items.forEach((e, i) => {
                    if (tot > (i + 1)) {
                        e.push(this.compararPais(e, items[i + 1]));
                    }
                });
            }
        });

        // set img default
        aFiltro.forEach(e => {
            if (e.length == 4) { // si tiene 4 items, no tiene imagen, se agrega por defecto vacio
                e.push("empty.png");
            }
        });

        return aFiltro;
    }

    public static compararPais(pais1: any[], pais2: any[]) {
        let colValue = 3;
        let value = 'abajo.svg';
        if (pais1[colValue] === pais2[colValue]) {
            value = "igual.svg";
        } else if (pais1[colValue] > pais2[colValue]) {
            value = "arriba.svg";
        }
        return value;
    }
}