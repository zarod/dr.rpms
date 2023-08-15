//To create a channel the following is to be done:
  // 1. create a seed
  // 2. cerate an author with that seed
  // 3. announce channel with the author 
// The following arguents should be passed to the author function:
  // seed: string;
  // options: SendOptions;
  // multiBranching: boolean; // default: false
  // depth: number; // default: 3 (min: 3, max: 17)
  // mwm: number; // default: 9 (min: 1, max: 14)
  // localPow: boolean; // default: false

  // what are options?
  //(answer)  The options are the node and the localPow
  // what is the multiBranching? 
  // (answer)  The multiBranching is a boolean that indicates if the channel is multi branching or not
  // what is the depth?
  // (answer)  The depth is the depth of the merkle tree
  // what is the mwm?
  // (answer)  The mwm is the minimum weight magnitude
  // what is the localPow?
  // (answer)  The localPow is a boolean that indicates if the pow is done locally or not










import { Injectable } from '@angular/core';
import init from 'iota-streams-wasm/web/iota_streams_wasm.js'
//import { Author, SendOptions, Address } from "@iota/streams/node";
import * as Streams from "iota-streams-wasm/web";
import {CryptoHelper} from './helper.service';
import { readFileSync, writeFileSync } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class IOTAService {
  private node = "https://chrysalis-nodes.iota.org/";
  //private options = new Streams.SendOptions(this.node,true);
  private author: any;
  private options: Streams.SendOptions;

  constructor (
    private cryptoHelper: CryptoHelper,
  ) {
    await init();
    Streams.set_panic_hook();

    // Create options
    this.options = new Streams.SendOptions(this.node,true);

    
    // Announce new channel
    
    
    

  }
  public async createChannel() {

    //create seed: string;
    const authorSeed = this.cryptoHelper.createSeed();

    // Create author with new seed
    this.author = new Streams.Author(authorSeed, this.options.clone(), Streams.ChannelType.MultiBranch);
    console.log('Author: Created author and new channel');
  

    // Announce new channel
    const response = await this.author.clone().send_announce();

    //link to the announcement
    const announcementLink = response.link;
    console.log("Announcement link: ", announcementLink.toString());

    // Fetch message details

    console.log("Author seed: ", authorSeed);
    console.log("Announcement link: ", announcementLink.toString());
    console.log("Channel address: ", this.author.channel_address());
    console.log("Multi branching: ", this.author.is_multi_branching());
  }

  public async announceChannel(): Promise<void> {
    console.log('Author: Send announcement');

    if (!this.author) {
      throw new Error("Author is not initialized. Call createAuthor() first.");
    }

    // Announce new channel
    const response = await this.author.clone().send_announce();
    const announcementLink = response.link;
    console.log("Announcement link: ", announcementLink.toString());

    // Fetch message details
    const announcementMessageDetails = await this.author.clone().get_client().get_link_details(announcementLink.copy());
    console.log(this.cryptoHelper.getExplorerUrl("mainnet", announcementMessageDetails.get_metadata().message_id));

    // Write announcement link to off-Tangle link exchange
    writeFileSync('./offTangleComs/1_announcement.txt', announcementLink.toString());
  }

  addkeys2IOTA(keys: string[]){
    new Streams.
  }

  addChannel(owner, address, link) {
    
  }

  

  public async receiveSubscription(): Promise<void> {
    console.log('\x1b[36m%s\x1b[0m', 'Author: Receive subscription and send keyload message');

    if (!this.author) {
      throw new Error("Author is not initialized. Call createAuthor() first.");
    }

    // Receive subscription
    const subscriptionLinkString = readFileSync('./offTangleComs/2_subscription.txt', 'utf8');
    const subscriptionLink = Streams.Address.parse(subscriptionLinkString);
    await this.author.clone().receive_subscribe(subscriptionLink.copy());

    // Read announcement message
    const announcementLinkString = readFileSync('./offTangleComs/1_announcement.txt', 'utf8');
    const announcementLink = Streams.Address.parse(announcementLinkString);

    // Send keyload message
    const response = await this.author.clone().send_keyload_for_everyone(announcementLink);
    const keyloadLink = response.link;
    console.log("Keyload link: ", keyloadLink.toString());

    // Fetch message details
    const keyloadMessageDetails = await this.author.clone().get_client().get_link_details(keyloadLink.copy());
    console.log(this.cryptoHelper.getExplorerUrl("mainnet", keyloadMessageDetails.get_metadata().message_id));

    // Write keyload link to off-Tangle link exchange
    writeFileSync('./offTangleComs/3_keyload.txt', keyloadLink.toString());
  }

  public async fetchNewMessages(): Promise<void> {
    console.log('\x1b[36m%s\x1b[0m', 'Author: Fetch new messages from channel');
  }
}
