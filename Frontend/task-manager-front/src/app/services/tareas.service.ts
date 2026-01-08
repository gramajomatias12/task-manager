import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { environment } from '../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarTarea(tarea: Tarea): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
}
