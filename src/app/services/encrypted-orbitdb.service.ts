import { Injectable } from '@angular/core';
// import CryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
import {OrbitDB} from 'orbit-db';
import { IpfsService } from './ipfs.service';
//import { OrbitDbService } from '../services/orbit-db/orbitdb.service';

@Injectable({
  providedIn: 'root'
})
export class EncryptedOrbitDbService {

  private intervalId: any;
  private ipfs: any;
  private orbitdb: any;
  private db: any;
  private encryptionKey = 'my-secret-key';
  jsonString:any;
  encrypted: any;

  constructor(private ipfsService: IpfsService) {}

  //the follwing function starts the process of sensor data simulation every second
  start() {
    // Initialize IPFS and OrbitDB
    this.initIpfs().then(() => {
      return this.initOrbitDb();
    }).then(() => {
      // Start the process every second
      this.intervalId = setInterval(() => {
        // Generate data
        const data = this.generateData();

        // Encrypt data
        const encryptedData = this.encryptData(data);

        // Store encrypted data on OrbitDB
        this.storeData(encryptedData);
      }, 1000);
    }).catch((error) => {
      console.error(error);
    });
  }

  async newStart(): Promise<void> {
    // Initialize IPFS and OrbitDB
    try {
    await this.initIpfs();
    await this.initOrbitDb();
    // Start the process every second
    this.intervalId = setInterval(async () => {
    // Generate data
    const data = this.generateData();
    
    // Encrypt data
    const encryptedData = this.encryptData(data);
    
    // Store encrypted data on OrbitDB
    await this.storeData(encryptedData);
    }, 1000);
    } catch (error) {
    console.error(error);
    }
    }

  stop() {
    // Stop the process by clearing the interval
    clearInterval(this.intervalId);
  }

  private async initIpfs() {
    this.ipfs = await this.ipfsService.getIPFSInstance();
  }

  private async initOrbitDb() {
    this.orbitdb = await OrbitDB.createInstance(this.ipfs);
    this.db = await this.orbitdb.docstore('sensor-1',{ accessController: { write: ['*'] } });
  }


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

  private async encryptData(data: any) {
    this.jsonString = JSON.stringify(data);
    const encrypted = AES.encrypt(this.jsonString, this.encryptionKey).toString();
    return { encrypted };
  }

  private storeData(encryptedData: any) {
    this.db.put(encryptedData);
  }

  private async subscribeDb(address: string, dbName: string) {
     this.orbitdb = await OrbitDB.createInstance(this.ipfs);
    this.db = await this.orbitdb.open(address + '/' + dbName, { replicate: true });
    this.db.events.on('replicated', () => {
      console.log(`New data replicated in database at address ${address}`);
    });
    this.db = db;
  }
}
