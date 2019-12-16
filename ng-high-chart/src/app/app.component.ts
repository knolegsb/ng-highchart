import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-high-chart';

  stock: StockChart;
  constructor(private http: HttpClient) {}
  
  ngOnInit() {   

    this.http.get('http://localhost:3000').subscribe((res) => {
           
      this.stock = new StockChart({
        chart: {
          height: 700
        },
        rangeSelector: {
          buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1D'          
            }, {
              type: 'all',
              count: 1,
              text: 'All'
            }
          ],
          selected: 1,
          inputEnabled: false
        },
        title: {
          text: 'AAPL Stock Price'
        },        
        series: [{
          name: 'AAPL',
          type: 'candlestick',            
          data: <never>res,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });

  }  
}
