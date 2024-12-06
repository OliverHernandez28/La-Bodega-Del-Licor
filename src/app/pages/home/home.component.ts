import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/interfaces/categorias';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    TarjetaCategoriaComponent, CommonModule, RouterModule
  ]
})
export class HomeComponent implements OnInit {
  constructor(private headerService: HeaderService, private categoriaService: CategoriasService) { }

  categorias: WritableSignal<Categoria[]> = signal([])

  ngOnInit(): void {
    this.headerService.titulo.set("")
    this.headerService.extentito.set(true)
    this.categoriaService.getAll().then(elementos => {
      this.categorias.set(elementos)
    })

  }

  ngOnDestroy(): void {
    this.headerService.extentito.set(false)
  }
}
