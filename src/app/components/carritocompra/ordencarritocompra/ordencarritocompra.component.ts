import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CarritocompraService } from '../../../services/carritocompra.service';

@Component({
  selector: 'app-ordencarritocompra',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ordencarritocompra.component.html',
  styleUrl: './ordencarritocompra.component.css',
})
export class OrdencarritocompraComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar'; // usa 'bar' si quieres gráfico de barras
  barChartLegend = true;
  barChartData: ChartDataset<'bar'>[] = []; // tipo correcto

  constructor(private ccService: CarritocompraService) {}

  ngOnInit(): void {
    this.ccService.OrderCarritoCompra().subscribe((data) => {
      this.barChartLabels = data.map(item => item.username);
      this.barChartData = [
        {
          data: data.map(item => item.precioProducto),
          label: 'Precio de productos por usuario',
          backgroundColor: '#4CAF50',
          borderColor: '#388E3C',
          borderWidth: 1,
        },
      ];
    });
  }
}
