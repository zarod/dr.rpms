/**
 * This component includes the logic to navigate to the Patients and Hospitals pages.
 * - Patients: )
 *  - Create an IPFS instance using the IpfsService
 *    - This Ipfs instance will be shared with the OrbitDbService and IotaStreamsService through shared service 
 *  - Create an OrbitDB instance using the OrbitDbService
 *  - Create a database for the OrbitDB instance using the OrbitDbService
 *  - Create an IOTA Streams channel using the IotaStreamsService
 *  - Add any additional logic to navigate to the Patients page here
 * 
 *  
 * - Hospitals: (By clicking on the Hospitals button)
 *   - Hospitals should receive the address of the IOTA channel as well as the pre-shared key to accress the branch for each sensor
 *   - In each IOTA channel includes the following information:
    *   - Orbitdb address of the patient as an input
    *   - The data-based for the sepecific sensor 
    *   - The decryption key to decrypt the values on orbitdb database
 * 
 **/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IpfsService } from './services/ipfs.service';
import { OrbitDbService } from './services/orbitdb.service';
import { IOTAService } from './services/iota.service';
import { SharedService } from './services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
private ipfs: any;
  orbitdb: any;
  private shareIpfs: any;
  constructor(private router: Router, 
              private ipfsService: IpfsService, 
              private orbitdbService: OrbitDbService, 
              private iotaStreams: IOTAService, 
              private sharedService: SharedService) {}


// By pressing the Patients button, the following steps should be executed:
// 1. create an ipfs instance (done)
// 2. create a orbitdb instance for the same ipfs instance (done)
// 3. create an iota streams channel with the hard-coded pre-shared key (or pre-shared key as input)
// at this point the pre-shared key is not available yet 
//5. navigate to the Patients page


  navigateToPatients() {

   
    this.router.navigate(['/patients']);
  }


// By pressing the Hospitals button, the following steps should be executed:
// 1. navigate to the Hospitals page
// 2. Hospitals should receive the address of the IOTA channel as well as the pre-shared key to accress the branch for each sensor
//
  navigateToHospitals() {
    
    // Add any additional logic to navigate to the Hospitals page here
    this.router.navigate(['/hospitals']);
  }

}
