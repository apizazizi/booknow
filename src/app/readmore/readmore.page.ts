import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Book } from '../models/product.mode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.page.html',
  styleUrls: ['./readmore.page.scss'],
})
export class ReadmorePage implements OnInit{
  
  product = {} as Book;
  items = [];
  application : any;
  id: any;


  constructor(
    private actRoute: ActivatedRoute, 
    private afs:AngularFirestore) { 
      this.id = this.actRoute.snapshot.paramMap.get("id");
    }


    ngOnInit(){
      this.viewDetails(this.id);
    }


    async viewDetails(id:string){
      this.afs.doc("books/" + id).valueChanges().subscribe(data => {
        this.product.id = data["id"];
        this.product.name = data["name"];
        this.product.genre = data["genre"];
        this.product.price = data["price"],
        this.product.author = data["author"];
        this.product.description = data["description"];
        this.product.image = data["image"];
      });
      }
    

    }

