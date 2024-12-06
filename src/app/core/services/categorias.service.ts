import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/environment';
import { Categoria } from '../interfaces/categorias';
import { Articulo } from '../interfaces/articulos';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }


  async getAll(): Promise<Categoria[]> {
    const resultado = await fetch(enviroments.url + "/assets/data/data.json")
    const json = await resultado.json();
    return json;
  }

  async getIdByCategoria(idCategoria: number): Promise<Categoria | undefined> {
    const resultado = await fetch(enviroments.url + "/assets/data/data.json")
    const json: Categoria[] = await resultado.json();
    const categoria = json.find((elem: any) => elem.id == idCategoria);
    if (!categoria) {
      return;
    }
    return categoria;
  }

}
