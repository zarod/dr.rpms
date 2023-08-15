/** This page represents the business logic for the Patients 
In this page, we will do the following:
  *  - Initiate an IPFS instance using the IpfsService
  *  - Initiate an OrbitDB instance using the OrbitDbService
  * - Create a database for the OrbitDB instance using the OrbitDbService
  * - Create an IOTA Streams channel using the IotaStreamsService
  * - Add any additional logic to navigate to the Patients page here
  * 
**/
import { Component, OnInit } from '@angular/core'; 
import { IpfsService } from '../services/ipfs.service';
import { OrbitDbService } from '../services/orbitdb.service';
import { IOTAService } from '../services/iota.service';
import {OrbitDB} from 'orbit-db';
import { CryptoHelper } from '../services/helper.service';
import { EncryptedOrbitDbService } from '../services/encrypted-orbitdb.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private ipfsService:IpfsService,
              private orbitdbService: OrbitDbService,
              private iotaService: IOTAService, 
              private orbitdb: OrbitDB,
              private cryptoHelper: CryptoHelper,
              private encryptedOrbitDbService: EncryptedOrbitDbService
    ) { }

  private ipfs: any;
  private dbLog: any;
  private iotaInstance: any;
  private intervalTime: number = 1000;
  private intervalId: any;
  private orbitdbInstance: any;
  private data: any;

  //initiate an ipfs instance
  //initiate an orbitdb instance for the same ipfs instance
 //create a database for the orbitdb instance
 //create an IOTA seed (IOTA address)

  async ngOnInit():Promise<void> {
    
    //initiate an ipfs instance
    this.ipfs = this.ipfsService.getIPFSInstance();
    
    //init an orbitdb instance for the same ipfs instance 
    this.orbitdb = await this.orbitdbService.getOrbitDbInstance(this.ipfs);
    this.dbLog = await this.orbitdb.eventlog('sensor-1', 
    { accessController: 
      { write: ['*'] } });
    this.dbLog.load(); // load existing database

    //Iniate 
    this.iotaInstance = this.iotaService.createAuthor();
    //announce channel
    
    }
//The following function will:
//generate sensor data 
//encrypt the sensor data and 
//add the encrypted data to the orbitdb database
    

//todo: integrate 'addencryptionkeytoiotachannel' 
// I have to translate the following functionality to the actual service in this app
async start(){
  this.ipfs= await this.ipfsService.getIPFSInstance();
  this.orbitdbInstance = await OrbitDB.createInstance(this.ipfs);
  this.dbLog= this.orbitdbInstance.eventlog('sensor-1',  { accessController: 
    { write: ['*'] } });
await this.dbLog.load(); // load existing database

  this.intervalId = setInterval(async ()=> {
    //generating sensor data
    //encrypting sensor data
    //adding encrypted data to orbitdb database
    //adding encrypted keys to iota channel
    let data = await this.cryptoHelper.startSimulationAndStoring(this.dbLog, this.intervalTime);

    /adding encryption key to iota channel

    await addEncryptedKeyToIOTAChannel(encryptedData);
    await this.cryptoHelper.addEncryptedDataToOrbitDB(encryptedData);
  }, 1000);
 
}




async startAddingData() {
      await this.cryptoHelper.startSimulationAndStoring(this.dbLog, this.intervalTime);

    
}


async stopAddingData() {
  clearInterval(this.intervalId);

}
}