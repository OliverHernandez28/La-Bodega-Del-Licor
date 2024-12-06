import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Articulo } from '../../core/interfaces/articulos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterLink } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';
import { perfil } from '../../core/interfaces/perfil';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterLink],
})
export class CarritoComponent {
  constructor(private productoService: ProductosService, private headerService: HeaderService, public cartService: CartService, private articuloService: ProductosService, public perfilService: PerfilService, private router: Router) {

  }

  productosCarrito: WritableSignal<Articulo[]> = signal([]);

  usuario: perfil = { nombre: "", direccion: "", cp: 0, detalleEntrega: "", telefono: "" }
  ngOnInit(): void {
    this.headerService.titulo.set("CARRITO")
    this.cartService.carritoActual.forEach((element, index) => {
      this.articuloService.getById(element.idCategoria, element.idProducto).then(producto => {
        if (producto) this.productosCarrito.set([...this.productosCarrito(), producto])
        this.calcularInformacion()
      })
    })
  }

  eliminarProducto(idCategoria: number, id: number) {
    this.cartService.removeProduct(idCategoria, id)
    this.calcularInformacion()
  }

  formateo(precio: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(precio);
  }
  subtotal: number = 0
  delivery: number = 0
  total: number = 0
  calcularInformacion() {
    this.total = 0
    this.subtotal = 0
    this.cartService.carritoActual.forEach((element, index) => {
      let multiplicarcion = element.cantidad * (this.productosCarrito()[index]?.precio || 0)
      this.subtotal += multiplicarcion
    })

    this.total = this.subtotal + this.delivery
  }

  cambiarCantidad(idCategoria: number, id: number, cantidad: number) {
    this.cartService.changeQuantityProduct(idCategoria, id, cantidad)
    this.calcularInformacion()
  }

  enviarMensaje() {
    if (!this.perfilService.perfil()) {

      Swal.fire({
        title: "Aún no tienes datos de entrega",
        text: "Para confirmar tu pedido, es necesario ingresar los datos de entrega",
        icon: "warning",
      }).then(() => {
        this.router.navigate(["/perfil"])
      })

    }
    else {
      let cantidadTotal = this.cartService.carritoActual.length
      let pedidosPromesas = this.cartService.carritoActual.map((element, index) =>
        this.productoService.getById(element.idCategoria, element.idProducto).then(producto => {
          if (index == cantidadTotal - 1) return `${producto?.nombre.padEnd(15, " ")} ${element.cantidad} piezas. `
          return `${producto?.nombre.padEnd(15, " ")} ${element.cantidad} piezas. \n`

        })
      )
      Promise.all(pedidosPromesas).then((pedidos) => {
        let pedido = pedidos.join("")
        let mensaje = `
Hola, me gustaria realizar el siguiente pedido a nombre de ${this.perfilService.perfil()?.nombre}.
Seria el siguiente pedido: \n${pedido}
Mi número de teléfono es ${this.perfilService.perfil()?.telefono}.
La dirección de entrega es ${this.perfilService.perfil()?.direccion} cp ${this.perfilService.perfil()?.cp}.
Detalles del lugar de entrega: ${this.perfilService.perfil()?.detalleEntrega}.
Subtotal: ${this.formateo(this.subtotal)}
Delivery: ${this.formateo(this.delivery)}
Total: ${this.formateo(this.total).padStart(11, " ")}
Muchas gracias.`

        let numeroEnvio = +523325366773
        const link = `https://wa.me/${numeroEnvio}?text=${encodeURIComponent(mensaje)}`
        window.open(link, '_blank')


        Swal.fire({
          title: "¿Pudiste enviar tu pedido correctamente?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Si",
          confirmButtonColor: "#198754",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.finalizarPedido()
          } else if (result.isDenied) {
            this.editarPedido()
          }
        });




      });

    }
  }

  finalizarPedido() {
    this.subtotal = 0
    this.delivery = 0
    this.total = 0
    this.cartService.limpiarCarrito()
    Swal.fire({
      title: "LA BODEGA DEL LICOR AGRADECE TU COMPRA",
      text: "En los proximos minutos te sera enviado el horario de entrega de tu pedido",
      icon: "success",
    }).then(() => {
      this.router.navigate(["/"])
    })

  }

  editarPedido() {
  }
}
