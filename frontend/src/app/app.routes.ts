import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '', loadComponent: () => import('./layout/layout/layout.component')
        .then(m => m.LayoutComponent),        
    },
    {
        path: 'cadastro', loadComponent: () => import('./features/cadastro/cadastro.component')
        .then(m => m.CadastroComponent),
    },
    {
        path: 'listagem', loadComponent: () => import('./features/listagem/listagem.component')
        .then(m => m.ListagemComponent),
    }
];
