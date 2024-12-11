import { Movie } from './../../../common/interface';
import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons/faTrashCan'
import {FaIconComponent} from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: MovieService = inject(MovieService);

  movies: Movie[] = [];

  constructor() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getMovies().subscribe(
      {
        next: value => {
          this.movies = value.status;
        },
        complete: () => {
          console.log('Movies loaded successfully');
        },
        error: err => {
          console.error(err.message);
        }
      }
    )
  }

  protected readonly faTrashCan = faTrashCan;

  deleteMovie(movie: Movie) {
    if (confirm('Are you sure to delete ' + movie.title + '?'))
      this.movieService.deleteMovie(movie._id).subscribe(
    {
      next: value => {
        console.log(value);
      },
      error: err => {
        console.error(err);
      }
    })

  }

}
