import { Component, Input } from '@angular/core';
import { Categoria } from '../../interfaces/categorias';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-categoria',
  templateUrl: './tarjeta-categoria.component.html',
  styleUrl: './tarjeta-categoria.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class TarjetaCategoriaComponent {
  @Input() categoria!: Categoria;
}
