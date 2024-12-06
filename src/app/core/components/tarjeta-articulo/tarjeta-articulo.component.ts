import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Articulo } from '../../interfaces/articulos';

@Component({
  selector: 'app-tarjeta-articulo',
  templateUrl: './tarjeta-articulo.component.html',
  styleUrl: './tarjeta-articulo.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class TarjetaArticuloComponent {
  @Input() articulo!: Articulo;
}
