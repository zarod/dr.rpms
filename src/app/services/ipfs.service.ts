import { Injectable } from '@angular/core';
import * as IPFS from 'ipfs-core'



@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private ipfs: any;

  constructor() {
    this.initIPFS();
  }

  private async initIPFS() {
    const ipfsOptions = {
      repo: './ipfs',
      start: true,
      preload: {
        enabled: false
      },
      EXPERIMENTAL: {
        ipnsPubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
          ]
        },
      }
    };
   
    this.ipfs = await IPFS.create(ipfsOptions);
    
  }

  public async getIPFSInstance() {
    return await this.ipfs;
  }
}
