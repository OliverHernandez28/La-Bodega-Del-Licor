import { Articulo } from "./articulos";

export interface Categoria{
    id: number;
    nombre: string;
    fotoUrl: string;
    productos: Articulo[];
}