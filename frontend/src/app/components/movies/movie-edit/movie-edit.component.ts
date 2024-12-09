import { MovieService } from './../../../services/movie.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Movie } from '../../../common/interface';

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
  formMovie: FormGroup = this.formBuilder.group({
    _id: [],
    title: [''],
    year: [new Date().getFullYear()],
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
  }

  protected readonly Date:DateConstructor = Date;
  myNewGenre: FormGroup = this.formBuilder.group({
    newGenre: ['']
  });

  editar = false;

  addMovie() {

    //SI editamos ACTUALIZAMOS

    //Si NO editamos AÑADIMOS

  }

  addNewGenre() {
    let newGenres = this.genres.value;
    newGenres.push(this.myNewGenre.get('newGenres')?.value);
    this.formMovie.setControl(
     'genres',
      new FormControl(newGenres)
    );
    this.myNewGenre.reset();
  }
}
