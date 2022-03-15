import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public name: any=[];

  constructor() {
    this.name = [
      {name: "A Beautiful Spy"},
      {name: "Bridesmaids Club: Big Bollywood Wedding"},
      {name: "Grip : The Art of Working Smart (and Getting to What Matters Most)"},
      {name: "Heatwave"},
      {name: "Hilda Fiction #3: Hilda and the Nowhere Space"},
      {name: "James and the Giant Peach"},
      {name: "Kebaya Tales : Of Matriarchs, Maidens, Mistresses and Matchmakers"},
      {name: "Mermicorns #2: A Friendship Problem"},
      {name: "Quiet Companions"},
      {name: "Read Real Japanese: Fiction"},
      {name: "Red Pill"},
      {name: "Science Fictions : Exposing Fraud, Bias, Negligence and Hype in Science"},
      {name: "The Beginner's Guide to Loneliness"},
      {name: "The House of Serendipity: Sequins & Secrets"},
      {name: "The Smallest Man"},
    ];
   }

   filterItems(searchTerm: string) {
     return this.name.filter((item: { name: string; }) => {
       return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
     });
   }
}
