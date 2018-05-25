export class Arduino {
    
    U: number;
    T: number;
    date: Date;

    constructor(U: number, T: number, dateTime: Date) {
        this.U = U;
        this.T = T;
        this.date = dateTime;
    }

    toString(){
      let infoTempUmd = "Umidity: " + this.U + " " +  this.T + this.date.toString();
      return infoTempUmd; 
    }
}

