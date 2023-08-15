/***
 * In this file the following steps should be executed:
 * 1. inputing the pre-shared key to aaccess the iota streams channel
 * 2. get the orbitdb address of the patient, the database for the specific sensor, and the decryption key to decrypt the values on orbitdb database from the iota streams channel
 * 3. The information in 2 should be visible in an input field
 *   - By pressing the getValues button, the values from the orbitdb database should be retrieved and displayed in the browser
 */

import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import { OrbitDbService } from '../services/orbitdb.service';
import { IotaService } from '../services/iota.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  private ipfs: any;
  private orbitdb: any;

  constructor() { }

  ngOnInit(): void {
    //init an ipfs instance
 

}
