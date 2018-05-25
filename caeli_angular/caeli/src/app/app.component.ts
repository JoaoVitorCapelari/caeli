import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Arduino } from '../models/arduino';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

infoTempUmd: Arduino = null;

  ngOnInit(): void  {
    const socket = socketIo('http://localhost:3000/');
    socket.on('tU', (data) => {
      console.log(data)
      let umidity = data.U.substring(2);
      let temperature = data.T.substring(2);
      let date = data.date + " " + data.time;
      this.infoTempUmd = new Arduino(umidity, temperature, new Date(date));
    });
  }
}

