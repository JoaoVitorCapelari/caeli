import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Arduino } from '../models/arduino';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

infoTempUmd: Arduino = null;
chart: any;
canvas: any;

humidity    = [0];
temperature = [0];
date        = ["0"];


  ngOnInit(): void  {
    const socket = socketIo('http://localhost:3000/');
    socket.on('tU', (data) => {
      console.log(data)
      let humidity     = data.H.substring(2);
      let temperature  = data.T.substring(2);
      let date         = data.date + " " + data.time;
      let day          = data.date;
      let time         = data.time;
      this.infoTempUmd = new Arduino(humidity, temperature, new Date(date), day, time);

      this.humidity.push(humidity);
      this.temperature.push(temperature);
      this.date.push(date);

      this.chart.update();
    });
    
    this.drawChart(); 

  }

  private drawChart(){
    this.chart = new Chart('chart', {
        type: 'line',
        data: {
            labels: this.date,
            datasets: [{
                label: 'Temp',
                data: this.temperature,
                backgroundColor: [
                  '#E8A10C',
                ],
                borderColor: [
                  '#E8A10C',
                ],
                fill: false,
            },
               { 
                label: 'Humidity',
                data: this.humidity,
                backgroundColor: [
                  '#3CFFE8',
                ],
                borderColor: [
                  '#3CFFE8',
                ],
                fill: false,
                }]
            },
            options: {
              responsive: true,
                  title: {
                      display: true,
                      text: 'Temperature °C x Humidity %'
                  },
                  tooltips: {
                      mode: 'index',
                      intersect: false,
                  },
                  hover: {
                      mode: 'nearest',
                      intersect: true
                  },
                  scales: { 
                      xAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: 'Period'
                          }
                      }],
                      yAxes: [{
                          display: true,
                          scaleLabel: {
                              display: true,
                              labelString: 'Value'
                          }
                      }]
                  }
            }
        });
  }
}
