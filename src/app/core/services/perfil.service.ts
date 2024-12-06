import { Injectable, signal, WritableSignal } from '@angular/core';
import { perfil } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const perfil = localStorage.getItem("cliente")
      if (perfil) this.perfil.set(JSON.parse(perfil))
    }
  }

  perfil: WritableSignal<perfil | undefined> = signal(undefined)

  guardarDatos(perfil: perfil) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("cliente", JSON.stringify(perfil))
      this.perfil.set(perfil)
    }
  }



}
