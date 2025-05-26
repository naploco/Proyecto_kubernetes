export interface Libro {
  id?: number;
  nombre: string;
  descripcion: string;
  ejemplar: number;
  autor: string;
  edicion: string;
  activo: boolean;
  eliminado: boolean;
}
