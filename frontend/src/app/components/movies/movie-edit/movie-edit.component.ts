import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent {
  @Input("id") id!: string;

  ngOnInit() {
    this.loadMovie();
  }

  private loadMovie() {
    if (this.id) {
      //Editamos pelicula. Rellenamos formulario:

    } else {
      //Añadimos pelicula nueva. Vaciamos formulario:

    }
  }

}
