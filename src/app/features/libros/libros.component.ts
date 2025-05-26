import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibrosService } from './libro.service';

@Component({
  standalone: true,
  selector: 'app-libros',
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.component.html',
})
export class LibrosComponent implements OnInit {
  libros = signal<any>([]);
  nuevoLibro = signal<any>({
    nombre: '',
    descripcion: '',
    ejemplar: 1,
    autor: '',
    edicion: '',
    activo: true,
    eliminado: false
  });
  
  mostrarModal: boolean = false;
  editandoId: number | null = null;
  libroEditado = signal<any>(null);
  confirmarEliminarId: number | null = null;
  paginaActual: number = 1;
  tamanoPagina: number = 10;

  constructor(
    private _servicio: LibrosService
  ){}

  ngOnInit() {
    this._servicio.getAll().subscribe(data => this.libros.set(data));
  }

  agregar() {
    this._servicio.create(this.nuevoLibro()).subscribe(libro => {
      this.libros.update(arr => [...arr, libro]);
      this.nuevoLibro.set({ nombre: '', descripcion: '', ejemplar: 1, autor: '', edicion: '', activo: true, eliminado: false });
    });
  }

  eliminar(id: number) {
    this.confirmarEliminarId = id;
  }

  confirmarEliminar() {
    if (this.confirmarEliminarId !== null) {
      this._servicio.delete(this.confirmarEliminarId).subscribe(() => {
        this.libros.update(arr => arr.filter((x: any) => x.id !== this.confirmarEliminarId));
        this.confirmarEliminarId = null;
      });
    }
  }

  cancelarEliminar() {
    this.confirmarEliminarId = null;
  }

  iniciarEdicion(libro: any) {
    this.editandoId = libro.id;
    this.libroEditado.set({ ...libro });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.libroEditado.set(null);
  }

  guardarEdicion() {
    const libro = this.libroEditado();
    this._servicio.update(libro.id, libro).subscribe((actualizado) => {
      this.libros.update(arr => arr.map((x: any) => x.id === actualizado.id ? actualizado : x));
      this.cancelarEdicion();
    });
  }

  get librosPaginados() {
    const librosOrdenados = [...this.libros()].sort((a, b) => b.id - a.id);
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return librosOrdenados.slice(inicio, inicio + this.tamanoPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.libros().length / this.tamanoPagina);
  }

  cambiarPagina(delta: number) {
    const nuevaPagina = this.paginaActual + delta;
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  trackId(index: number, libro: any): any {
    return libro.id;
  }
}
