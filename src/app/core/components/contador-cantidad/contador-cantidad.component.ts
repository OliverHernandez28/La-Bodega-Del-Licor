import { Component, Output, signal, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.scss',
  standalone: true
})
export class ContadorCantidadComponent implements OnInit {
  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>();
  @Input() cantidadInicial: number = 1

  ngOnInit(): void {
    this.numero.set(this.cantidadInicial)
  }
  actualizarNumero(masMenos: number) {
    this.numero.set(Math.max(this.numero() + masMenos, 1));
    this.cantidadInicial = this.numero()
    this.cantidadCambiada.emit(this.numero());
  }
}

