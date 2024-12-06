import { Component, Input, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { CommonModule, Location } from '@angular/common';
import { Articulo } from '../../core/interfaces/articulos';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ContadorCantidadComponent,
  ]
})
export class ArticuloComponent {
  constructor(private location: Location, private headerService: HeaderService, private router: ActivatedRoute, private route: Router, private productoService: ProductosService, private cartService: CartService) { }
  producto?: Articulo
  cantidad = signal(1)
  categoria = 0

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.categoria = parseInt(params['categoria'])
      let id = parseInt(params['id'])
      if (this.categoria && id) {
        this.productoService.getById(this.categoria, id).then(elemento => {
          if (elemento) {
            this.producto = elemento
            this.headerService.titulo.set(elemento.nombre.toUpperCase())
          }
          else {
            this.route.navigate(["/"])
          }
        })
      }
      else {
        this.route.navigate(["/"])
      }
    })

    this.formateo(750)
  }


  formateo(precio: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(precio);
  }

  agregarAlCarrito() {
    if (!this.producto) return
    this.cartService.addProduct(this.categoria, this.producto?.id, this.cantidad())
    this.route.navigate(["/carrito"])
  }

  regresar() {
    this.location.back()
  }
}

