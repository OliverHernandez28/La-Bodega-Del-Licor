import { Component, effect, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { busqueda } from '../../core/interfaces/filtro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { Articulo } from '../../core/interfaces/articulos';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TarjetaArticuloComponent } from '../../core/components/tarjeta-articulo/tarjeta-articulo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipeModule, TarjetaArticuloComponent, RouterModule]
})
export class BuscarComponent {
  constructor(private headerService: HeaderService, private productoService: ProductosService) { }




  ngOnInit(): void {
    this.headerService.titulo.set("BUSCAR")
    this.getBusqueda()
  }

  filtroBusqueda = signal("");

  productos: any[] = []
  productosCopia: any[] = []
  getBusqueda() {
    this.productoService.getAll().then(productos => {
      this.productosCopia = productos
      this.productos = [...productos]
    })
  }


  filtrar = effect(() => {
    this.filtro()
  }, { allowSignalWrites: true })
  filtro() {
    this.productos = this.productosCopia
    if (this.filtroBusqueda() == "") return
    this.productos = this.productos.filter(elem => elem.nombre.toLowerCase().includes(this.filtroBusqueda().toLocaleLowerCase()))
  }
}
