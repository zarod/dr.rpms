import { Injectable } from '@angular/core';
import {OrbitDB} from 'orbit-db';
//import { IpfsService } from './ipfs.service';
//declare var OrbitDB: any;

@Injectable({
  providedIn: 'root'
})
export class OrbitDbService {
  private orbitdb: any;
  private dbDocs: any;
  private db: any;
  private dbLog: any;
  private ipfs: any;
  private orbitDbInstance: any;

  constructor() {
    
  }
// this is the function to create the orbitdb instance for the patients page. 


// private async initOrbitDB(ipfs: any) {
//   ortbitDbInstance = cd 
// }

  public async emitterDbDocs(ipfs: any) {
    //const ipfs = this.ipfsService.getIPFSInstance();
    this.orbitdb = await OrbitDB.createInstance(ipfs);
    this.dbDocs = await this.orbitdb.docstore('patients', { accessController: { write: ['*'] } });
    await this.dbDocs.load(); // load existing database   
  }

  //orbitdb log database is created for each sensor
  public async emitterDbLog(ipfs: any) {
    
    //create an orbitdb instance for the same ipfs instance
    this.orbitdb = await OrbitDB.createInstance(ipfs);
    this.dbLog = await this.orbitdb.eventlog('sensor-1', 
      { accessController: 
        { write: ['*'] } });
    await this.dbLog.load(); // load existing database
  }


  public async subscriberDb(address: string, dbName: string) {
    const orbitdb = await OrbitDB.createInstance(this.ipfs);
    const db = await orbitdb.open(address + '/' + dbName, { replicate: true });
    db.events.on('replicated', () => {
      console.log(`New data replicated in database at address ${address}`);
    });
    this.db = db;
  }

  //creating an orbitdb instance for the patients page
  public async getOrbitDbInstance(ipfs: any) {
    this.orbitdb = await OrbitDB.createInstance(ipfs);
    return this.orbitdb;
  }

  storeData(data: any) {
  this.dbDocs.put(data);  
  }



  public getdbDocs(): any {
    return this.dbDocs;
  }

  public getdbLog(): any {
    return this.dbLog;
  }
}
