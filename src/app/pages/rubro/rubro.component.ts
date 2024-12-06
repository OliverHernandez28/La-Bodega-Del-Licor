import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { Articulo } from '../../core/interfaces/articulos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TarjetaArticuloComponent } from '../../core/components/tarjeta-articulo/tarjeta-articulo.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss',
  standalone: true,
  imports: [TarjetaArticuloComponent, CommonModule, RouterModule]
})
export class RubroComponent {
  constructor(private headerService: HeaderService, private router: ActivatedRoute, private route: Router, private categoriaService: CategoriasService) { }
  productos: WritableSignal<Articulo[]> = signal([])
  categoriaId: number = 0
  ngOnInit(): void {

    this.router.params.subscribe(params => {
      let param = parseInt(params['id'])
      console.log(param)
      if (param) {
        this.categoriaId = param
        this.categoriaService.getIdByCategoria(param).then(elementos => {
          if (elementos) {
            this.productos.set(elementos.productos)
            this.headerService.titulo.set('FAMILIA ' + elementos.nombre.toUpperCase())
          }
        })
      }
      else {
        this.route.navigate(["/"])
      }
    })
  }
}
