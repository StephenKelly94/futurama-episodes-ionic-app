import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { EpisodeService } from  '../../app/services/episode.service';

@Component({
  selector: 'page-episodes',
  templateUrl: 'episodes.html'
})
export class EpisodesPage {
  platform:Platform;
  episodes:any;
  seasons:any;
  selectedSeason:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private episodeService:EpisodeService, platform: Platform) {
    this.platform = platform;
    this.getDefaults();
  }

  getDefaults(){
    this.seasons = [1,2,3,4,5,6,7]
    this.selectedSeason = 1;
  }

  ngOnInit(){
    this.getEpisodes(1);
  }

  getEpisodes(season:number){
    this.episodeService.getEpisodes(season).subscribe(response => {
      this.episodes = response;
    });
  }

  changeSeason(){
    console.log("Test")
    this.getEpisodes(this.selectedSeason);
  }

  viewLink(link:string){
    this.platform.ready().then(() => {
        open(link, "_blank", "location=yes");
    });
  }

  parseDate(oldDate:string){
    let date:Date = new Date(oldDate);
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    return this.getOrdinalSuffix(date.getDate()) + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
  }

  //https://ecommerce.shopify.com/c/ecommerce-design/t/ordinal-number-in-javascript-1st-2nd-3rd-4th-29259
  getOrdinalSuffix(n:number) {
    let s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  }

}
