import { Component, ViewChild } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'
import { perfil } from '../../core/interfaces/perfil';
import { PerfilService } from '../../core/services/perfil.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent {

  constructor(private headerService: HeaderService, private perfilService: PerfilService, private router: Router) { }

  isFormDisabled = false;

  ngOnInit(): void {
    this.headerService.titulo.set("PERFIL")
    this.prellenar()
  }
  cliente: perfil = {
    nombre: "",
    direccion: "",
    cp: 0,
    detalleEntrega: "",
    telefono: ""
  }

  prellenar() {
    if (!this.perfilService.perfil()) return
    this.isFormDisabled = true
    this.cliente = { ... this.perfilService.perfil()! }
  }

  guardar(data: NgForm) {
    if (!data.valid) {

      Swal.fire({
        title: "Por favor, completa todos los campos",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      })
      return
    }
    this.perfilService.guardarDatos(this.cliente)
    this.router.navigate(["/carrito"])
  }
}
