import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';
import { CommonModule } from '@angular/common';
import { TareaForm } from "../tarea-form/tarea-form";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-tareas-list',
  imports: [CommonModule, TareaForm, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './tareas-list.html',
  styleUrl: './tareas-list.scss',
})
export class TareasList implements OnInit {
  tareas: Tarea[] = [];
  tareaSeleccionada?: Tarea;

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareasService.getTareas()
      .subscribe(data => this.tareas = data);
  }

  eliminar(id: number) {
    this.tareasService.eliminarTarea(id)
      .subscribe(() => this.cargarTareas());
  }

  editar(tarea: Tarea) {
    this.tareaSeleccionada = tarea;
  }

  onGuardado() {
    this.cargarTareas();
    this.tareaSeleccionada = undefined;
  }
}
