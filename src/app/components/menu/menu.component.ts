import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
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
