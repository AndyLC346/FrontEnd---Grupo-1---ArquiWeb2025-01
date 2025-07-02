import { Component } from '@angular/core';
import { OrdencarritocompraComponent } from './ordencarritocompra/ordencarritocompra.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,OrdencarritocompraComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}

}
