#include <SoftwareSerial.h>

#include "DHT.h"

#define DHTPIN A1 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11

// Conecte pino 1 do sensor (esquerda) ao +5V
// Conecte pino 2 do sensor ao pino de dados definido em seu Arduino
// Conecte pino 4 do sensor ao GND
// Conecte o resistor de 10K entre pin 2 (dados) 
// e ao pino 1 (VCC) do sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() 
{
  Serial.begin(9600);
  Serial.println("Ceara Feelings test!");
  dht.begin();
}

void loop() 
{
  // A leitura da temperatura e umidade pode levar 250ms!
  // O atraso do sensor pode chegar a 2 segundos.
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // testa se retorno é valido, caso contrário algo está errado.
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
  delay(1000);
}
