import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private strg: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this.storage = await this.strg.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    return this.storage?.set(key, value);
  }

  public get(key: string) {
    return this.storage?.get(key);
  }

  public remove(key: string) {
    return this.storage?.remove(key);
  }

}
