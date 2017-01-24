import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class EpisodeService {
  http:any;
  baseUrl:String;

  constructor(http:Http){
    this.http = http;
    this.baseUrl = 'https://futurama-episodes.herokuapp.com/api';
  }

  getEpisodes(season:number){
    return this.http.get(this.baseUrl + `/season/${season}`)
      .map(res => res.json());
  }

}
