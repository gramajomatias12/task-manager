import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-tarea-form',
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.scss',
})
export class TareaForm {
  @Input() tareaEditar?: Tarea;
  @Output() guardado = new EventEmitter<void>();

  tarea: Tarea = {
    titulo: '',
    descripcion: '',
    estado: 'Pendiente'
  };

  constructor(private tareasService: TareasService) {}

  ngOnChanges() {
    if (this.tareaEditar) {
      this.tarea = { ...this.tareaEditar };
    }
  }

  guardar() {
    if (!this.tarea.titulo.trim()) return;

    if (this.tarea.id) {
      // EDITAR
      this.tareasService.actualizarTarea(this.tarea)
        .subscribe(() => {
          this.resetear();
          this.guardado.emit();
        });
    } else {
      // CREAR
      this.tareasService.crearTarea(this.tarea)
        .subscribe(() => {
          this.resetear();
          this.guardado.emit();
        });
    }
  }

  resetear() {
    this.tarea = {
      titulo: '',
      descripcion: '',
      estado: 'Pendiente'
    };
    this.tareaEditar = undefined;
  }
}

