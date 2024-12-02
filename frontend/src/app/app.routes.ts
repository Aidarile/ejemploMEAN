import { Routes } from '@angular/router';
import { MovieEditComponent } from './components/movies/movie-edit/movie-edit.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies/list',
        component: MovieListComponent
    },
    {
        path: 'movies/add',
        component: MovieEditComponent
    },
    {
        path: 'movies/edit/:id',
        component: MovieEditComponent
    },
    {
        path: '**',
        redirectTo: 'movies',
        pathMatch: 'full'
    }

];
