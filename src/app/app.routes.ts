import { Routes } from '@angular/router';

import { LibrosComponent } from './features/libros/libros.component';
import { EditorialesComponent } from './features/editoriales/editorial.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'libros',
    pathMatch: 'full',
  },
  {
    path: 'libros',
    component: LibrosComponent,
  },
  {
    path: 'editoriales',
    component: EditorialesComponent,
  },
];
