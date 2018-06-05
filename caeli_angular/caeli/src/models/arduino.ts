export class Arduino {
    
    H: number;
    T: number;
    date: Date;
    day: string;
    time: string;

    constructor(H: number, T: number, dateTime: Date, day: string, time: string) {
        this.H = H;
        this.T = T;
        this.date = dateTime;
        this.day = day;
        this.time = time;
    }

    toString(){
      let infoTempUmd = "Umidity: " + this.H + " " +  this.T + this.date.toString();
      return infoTempUmd; 
    }
}

