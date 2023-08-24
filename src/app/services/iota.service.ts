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


//The constructor is called when the class is instantiated
//The init function is called to initialize the wasm library
//The options are set with the node and the localPow
  constructor (
    private cryptoHelper: CryptoHelper,
  ) {
    init();
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
//what is the difference between the author and the author clone?
// (answer)  The author is the original author and the author clone is a copy of the author
//what is the reason for announcing the channel?
// (answer)  The reason for announcing the channel is to let the subscribers know that the channel is created
//can the channel be created without announcing it?
// (answer)  Yes, the channel can be created without announcing it
//when should the channel not be announced?
// (answer)  The channel should not be announced when the channel is already created
//what is the link?

  public async announceChannel(): Promise<void> {
    console.log('Author: Send announcement');

    if (!this.author) {
      throw new Error("Author is not initialized. Call createAuthor() first.");
    }

    // Announce new channel
    //It's kind of extracting the the announcement link from the author object
    const response = await this.author.clone().send_announce();
    const announcementLink = response.link;
    console.log("Announcement link: ", announcementLink.toString());

    // Fetch message details
    //what is in the message details?
    // (answer)  The message details contains the message id
    //can you give an example of a message id?
    //can you show me how a message id is looks like?
    // (answer)  The message id look like this: 0c9e1a9b    
    const announcementMessageDetails = await this.author.clone().get_client().get_link_details(announcementLink.copy());
    console.log(this.cryptoHelper.getExplorerUrl("mainnet", announcementMessageDetails.get_metadata().message_id));

    // Write announcement link to off-Tangle link exchange
    writeFileSync('./offTangleComs/1_announcement.txt', announcementLink.toString());
  }

  //Is it possible to find the channel address from the announcement link?
  // (answer)  Yes, it is possible to find the channel address from the announcement link
  //is the channel address the same as the announcement link?
  //which information is in the announcement link?
  // (answer)  The announcement link contains the channel address
  //Does the announcement link contain the message id?
  // (answer)  Yes, the announcement link contains the message id
  //Does the announcement link contain the seed?
  // (answer)  No, the announcement link does not contain the seed
  //Does the announcement link contain the encryption key?

  //Message need to be added to the channel, what is the process?
  // (answer)  The process is to create a subscriber and then send the message to the subscriber
  //The author should be able to send a message to the channel, how is this done?
  // (answer)  This is done by creating a subscriber and then sending the message to the subscriber
  //Is the author able to send a message to the channel without creating a subscriber?
  // (answer)  No, the author is not able to send a message to the channel without creating a subscriber
  //Is it possible to send a message to the channel without creating a subscriber?
  // (answer)  Yes, it is possible to send a message to the channel without creating a subscriber
  //how?
  // (answer)  By using the author clone
  //can you show me how to send a message to the channel without creating a subscriber?
  // (answer)  Yes, I can show you how to send a message to the channel without creating a subscriber by using the author clone and the send_signed_packet function 
  //show me an example of how to send a message to the channel without creating a subscriber?
  // (answer)  const response = await this.author.clone().send_signed_packet(this.author.channel_address(), "Hello World!");
  //show me an example of how to send a message to the channel with creating a subscriber?
  // (answer)  const subscriber = new Streams.Subscriber(this.author.channel_address(), this.options.clone());
  //           await subscriber.clone().receive_announcement();
  //           const response = await this.author.clone().send_signed_packet(subscriber.clone().channel_address(), "Hello World!");


// = comments
/// = chat

///How to fetch the keys with the pre-shared key?
/// (answer)  The keys can be fetched with the pre-shared key by using the fetch_keys function and the pre-shared key as an argument to the function 
///How to fetch the keys with the pre-shared key? (example)

//The following function will send the decryption key to the channel
//the key have to be fetched by the subscriber with the pre-shared key 

///should the pre-shared key also be included as an argument to the following function?
/// (answer)  Yes, the pre-shared key should also be included as an argument to the following function
///Can you show me how it looks like when the pre-shared key is included as an argument to the following function?
/// (answer)  const keys = await this.author.clone().fetch_keys(this.author.channel_address(), preSharedKey); 
///Can you show me how it looks like when the pre-shared key is included as an argument to the following function? (example) 
///how to add a message to iota streams channel with pre-shared key?
/// (answer)  The message can be added to iota streams channel with pre-shared key by using the send_signed_packet function and the pre-shared key as an argument to the function 
///how to add a message to iota streams channel with pre-shared key? (example)
/// (answer)  const response = await this.author.clone().send_signed_packet(this.author.channel_address(), preSharedKey, "Hello World!"); 


public async addkeys2Channel(keys: string[], preSharedKey: string){
    const response = await this.author.clone().send_signed_packet(this.author.     ,preSharedKey, keys);
    ///what is the response?     
    /// (answer)  The response is the link to the message
    ///so it means that the link can be used to fetch the message?
    /// (answer)  Yes, the link can be used to fetch the message
  
    return response.link;
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
    //const announcementLinkString = readFileSync('./offTangleComs/1_announcement.txt', 'utf8');
    //const announcementLink = Streams.Address.parse(announcementLinkString);

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
