import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }
  extentito = signal(false)
  titulo = signal("LA BODEGA DEL LICOR")
}
