import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carruti';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carritoActual: Cart[] = [
  ];
  constructor() {
    if (typeof localStorage !== 'undefined') {
      const cart = localStorage.getItem('carrito')
      if (cart) {

        const actual = new Date()
        const guardado = new Date(JSON.parse(localStorage.getItem('guardado') || '').fecha)

        if (actual.getTime() - guardado.getTime() > 1000 * 60 * 60 * 24 * 2) {
          localStorage.removeItem('carrito')
          localStorage.removeItem('guardado')
          this.carritoActual = []
        }
        else this.carritoActual = JSON.parse(cart)
      }
    }
  }



  addProduct(categoria: number, id: number, cantidad: number) {
    const indice = this.carritoActual.findIndex(element => element.idProducto == id && element.idCategoria == categoria)

    if (indice == -1) {
      const nuevoProducto: Cart = {
        idProducto: id,
        idCategoria: categoria,
        cantidad: cantidad
      }
      this.carritoActual.push(nuevoProducto)
    }
    else {
      this.carritoActual[indice].cantidad += cantidad
    }
    this.actualizarAlmacenamiento()
  }

  removeProduct(idCategoria: number, idProducto: number) {


    this.carritoActual = this.carritoActual.filter(element => !(element.idProducto === idProducto && element.idCategoria === idCategoria))

    if (this.carritoActual.length == 0) {
      return localStorage.removeItem('carrito')
    }
    this.actualizarAlmacenamiento()
  }

  changeQuantityProduct(idCategoria: number, idProducto: number, cantidad: number) {
    this.carritoActual = this.carritoActual.map(element => {
      if (element.idProducto === idProducto && idCategoria === idCategoria) {
        return { ...element, cantidad };
      }
      return element;
    });

    this.actualizarAlmacenamiento()
  }

  actualizarAlmacenamiento() {
    const fecha = new Date()
    const guardado = {
      fecha
    }
    localStorage.setItem('guardado', JSON.stringify(guardado))
    localStorage.setItem('carrito', JSON.stringify(this.carritoActual))
  }

  limpiarCarrito() {
    this.carritoActual = []
    localStorage.removeItem('carrito')
  }

}
