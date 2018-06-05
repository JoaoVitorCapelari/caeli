#include <SoftwareSerial.h>

#include "DHT.h"

#define DHTPIN A1 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11

// Conect pin 1 to left sensor +5V
// Conect pin 2 to sensor to the data pin defined in Arduino
// Conect pin 4 to sensor in GND
// Conect the resistor 10K between pin 2 (data) 
// and pin 1 (VCC) of the sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() 
{
  Serial.begin(9600);
  dht.begin();
}

void loop() 
{
  // The reading of temperature and umidity could take 250ms!
  // Delay of the sensor could reach 2 seconds.
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // test if return is valid, if not something went wrong!.
  if (isnan(t) || isnan(h)) 
  {
    Serial.println("Failed to read from DHT");
  } 
  else 
  {
    char buffer [64];

    char str_temp[6];
    char str_umd[6];

    /* 4 is mininum width, 2 is precision; float value is copied onto str_temp*/
    dtostrf(h, 4, 2, str_umd);
    dtostrf(t, 4, 2, str_temp);
    sprintf (buffer, "U:%s;T:%s",str_umd, str_temp);
    Serial.print(buffer);
  
  }
  delay(10000);
}
