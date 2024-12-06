import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/environment';
import { Articulo } from '../interfaces/articulos';
import { Categoria } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }


  async getByCategoria(idCategoria: number): Promise<Articulo[]> {
    const resultado = await fetch(enviroments.url + "/assets/data/data.json")
    const json: Categoria[] = await resultado.json();
    const productos = json.find((elem: any) => elem.id == idCategoria)?.productos;
    if (!productos) {
      return [];
    }
    return productos;
  }

  async getAll(): Promise<Articulo[]> {
    const resultado = await fetch(enviroments.url + "/assets/data/data.json")
    const json: Categoria[] = await resultado.json();
    let productos: any = [];
    json.forEach(categoria => {
      const productosConIdCategoria = categoria.productos.map(producto => ({
        ...producto,
        idCategoria: categoria.id
      }));
      productos = [...productos, ...productosConIdCategoria];
    });
    return productos;
  }

  async getById(categoriaProducto: number, idArticulo: number): Promise<Articulo | undefined> {
    const resultado = await fetch(enviroments.url + "/assets/data/data.json")
    const json: Categoria[] = await resultado.json();
    const categoria = json.find((elem: any) => elem.id == categoriaProducto)
    const producto = categoria?.productos.find((elem: any) => elem.id == idArticulo)
    return producto;
  }


}
