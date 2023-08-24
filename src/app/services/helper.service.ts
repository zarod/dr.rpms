import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import { AES } from 'crypto-js';
import { IOTAService } from './iota.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoHelper {


  constructor(
    private iotaService: IOTAService,
  ) {}
  
  private intervalId: any;
  private encryptionKey = 'my-secret-key';

  
  //generating sensor data
    //encrypting sensor data
    //adding encrypted data to orbitdb database
    //adding encrypt keys to iota channel
  async startSimulationAndStoring(db: any, intervalTime: number) {
    // Start the process every second
    this.intervalId = setInterval(() => {
      // Generate data
      const data = this.generateData();

      // Encrypt data
      const encryptedData = this.encryptData(data);

      // Store encrypted data on OrbitDB
      this.storeData(encryptedData, db);
    }, intervalTime);
}

async stopSimulation() {
  // Stop the process by clearing the interval
  clearInterval(this.intervalId);
}

private async encryptData(data: any) {
  const jsonString = JSON.stringify(data);
  const encrypted = AES.encrypt(jsonString, this.encryptionKey).toString();
  return { encrypted };
}

public createSeed(){
  const seed = crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('hex');
  return seed;
}
//
private async generateData() {
  return {
    timestamp: new Date().toISOString(),
    value: Math.random(),
    metadata: {
      patient_id: "123456789",
      device_id: "RPMSensor001",
      measurement_type: "random",
      units: "none",
      status: "ok",
      battery_level: 90,
    }
  };
}

toBytes(str: string): number[] {
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

async fromBytes(bytes: number[]): Promise<string> {
  let str = '';
  for (let i = 0; i < bytes.length; ++i) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

getExplorerUrl(network: string, messageId: string): string {
  return `https://explorer.iota.org/${network}/message/${messageId}`;
}

//should store into logdb type of database
private async storeData(encryptedData: any, db: any) {
  db.put(encryptedData);
}

addEncryptedDataToOrbitDB(){
  //create random encryption key

  //encrypt data


}
//todo: add encrypted data to iota channel
addEncryptedKeyToIOTAChannel(){
  
}
  
}

  



  
  

  

