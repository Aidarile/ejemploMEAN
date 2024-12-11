import { MovieService } from './../../../services/movie.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { Movie } from '../../../common/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css',
})
export class MovieEditComponent implements OnInit {
  @Input('id') id!: string;
  private readonly movieService: MovieService = inject(MovieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  protected formMovie: FormGroup = this.formBuilder.group({
    _id: [],
    title: ['', [Validators.required, Validators.minLength(2)]],
    year: [new Date().getFullYear(), 
      [Validators.required,
      Validators.min(1880),
      Validators.max(new Date().getFullYear())]
    ],
    director: [''],
    plot: [''],
    genres: [],
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0],
    }),
  });

  movie!: Movie;

  editar = false;

  genresList: string[] = [];

  /* FIN DE DECLARACIÓN DE VARIABLES*/ 
  ngOnInit() {
    this.loadMovie();
  }

  //Getters:
  get title(): any {
    return this.formMovie.get('title');
  }
  get year(): any {
    return this.formMovie.get('year');
  }
  get director(): any {
    return this.formMovie.get('director');
  }
  get plot(): any {
    return this.formMovie.get('plot');
  }
  get genres(): any {
    return this.formMovie.get('genres');
  }
  get poster(): any {
    return this.formMovie.get('poster');
  }
  get imbd(): any {
    return this.formMovie.get('imbd');
  }
  get rating(): any {
    return this.formMovie.get('imbd.rating');
  }
  get votes(): any {
    return this.formMovie.get('imbd.votes');
  }
  get newGenre(): any {
    return this.myNewGenre.get('newGenre');
  }


  private loadMovie() {
    if (this.id) {
      //Editamos pelicula. Rellenamos formulario:
      this.editar = true;
      this.movieService.getMovie(this.id).subscribe({
        next: (value) => {
          this.formMovie.setValue(value.status);
        },
        complete: () => {
          console.log('Movie loaded successfully');
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      //Añadimos pelicula nueva. Vaciamos formulario:
      this.formMovie.reset();
      this.editar = false;
    }

    this.movieService.getGenres().subscribe(
      {
        next: value => {
          console.log(value);
          this.genresList = value.status;
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
          console.log('Genres loaded');
        }
      }
    )
  }

  protected readonly Date:DateConstructor = Date;
  myNewGenre: FormGroup = this.formBuilder.group({
    newGenre: ['']
  });



  addMovie() {
    if (this.editar) {
      //SI editamos ACTUALIZAMOS
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe({
        next: value => {
          console.log(value);
          this.router.navigateByUrl('/movies/list');
      },
      error: err => {
        console.log(err);
      }
    })
    } else {
      //Si NO editamos AÑADIMOS
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe({
        next: value => {
          console.log(value);
          this.router.navigateByUrl('/movies/list');
      },
      error: err => {
        console.log(err);
      }
    })
    }

  }

  addNewGenre() {
    let newGenres = this.genres.value;

    if (!this.editar) {
      this.genresList.push(this.newGenre.value);
    } else {
      newGenres = this.genres.value;
      newGenres.push(this.newGenre.value);
      this.genresList.push(this.newGenre.value);
      this.formMovie.setControl(
        'genres', new FormControl(newGenres)    
    )
  }
    this.myNewGenre.reset();
  }
}
