import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Book } from '../models/product.mode';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.page.html',
  styleUrls: ['./update-page.page.scss'],
})
export class UpdatePagePage implements OnInit {
  product = {} as Book;
  id: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
 

  constructor(
    private actRoute: ActivatedRoute, 
    private afs:AngularFirestore,
    private afStorage: AngularFireStorage) { 
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

      async updateProduct(product: Book){
        await this.afs.collection('books').doc(this.id).update(product);

      }


      
    

    }
