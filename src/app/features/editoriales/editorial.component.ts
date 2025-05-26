import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorialService, Editorial } from './editorial.service';

@Component({
  standalone: true,
  selector: 'app-editoriales',
  imports: [CommonModule, FormsModule],
  templateUrl: './editorial.component.html',
})
export class EditorialesComponent implements OnInit {
  editoriales = signal<Editorial[]>([]);
  nuevaEditorial = signal<Editorial>({ nombre: '', ciudad: '' });
  editando: number | null = null;
  editEditorial = signal<Editorial>({ nombre: '', ciudad: '' });
  mostrarModal: boolean = false;
  confirmarEliminarId: number | null = null;

  constructor(private _servicio: EditorialService) {}

  ngOnInit() {
    this._servicio.getAll().subscribe(data => this.editoriales.set(data));
  }

  agregar() {
    this._servicio.create(this.nuevaEditorial()).subscribe(editorial => {
      this.editoriales.update(arr => [...arr, editorial]);
      this.nuevaEditorial.set({ nombre: '', ciudad: '' });
    });
  }

  eliminar(id: number) {
    this.confirmarEliminarId = id;
  }

  confirmarEliminar() {
    if (this.confirmarEliminarId !== null) {
      this._servicio.delete(this.confirmarEliminarId).subscribe(() => {
        this.editoriales.update(arr => arr.filter((x: Editorial) => x.id !== this.confirmarEliminarId));
        this.confirmarEliminarId = null;
      });
    }
  }

  cancelarEliminar() {
    this.confirmarEliminarId = null;
  }

  iniciarEdicion(editorial: Editorial) {
    this.editando = editorial.id!;
    this.editEditorial.set({ ...editorial });
  }

  guardarEdicion() {
    if (this.editando) {
      this._servicio.update(this.editando, this.editEditorial()).subscribe(edit => {
        this.editoriales.update(arr => arr.map(e => e.id === edit.id ? edit : e));
        this.cancelarEdicion();
      });
    }
  }

  cancelarEdicion() {
    this.editando = null;
    this.editEditorial.set({ nombre: '', ciudad: '' });
  }
}
