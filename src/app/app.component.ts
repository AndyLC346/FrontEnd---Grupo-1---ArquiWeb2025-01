import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendGrupo1';

 isMuted = true; // comienza silenciado
 volumenPersonalizado = 0.1; // para poner la cantidad de volumen

  toggleMute(audio: HTMLAudioElement) {
    if (this.isMuted) {
      // Desmutea y fija volumen personalizado
      this.isMuted = false;
      audio.muted = false;
      audio.volume = this.volumenPersonalizado;
      if (audio.paused) {
        audio.play();
      }
    } else {
      // Mutea
      this.isMuted = true;
      audio.muted = true;
    }
  }
}
