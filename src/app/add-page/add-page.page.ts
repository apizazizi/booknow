import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Book } from '../models/product.mode';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.page.html',
  styleUrls: ['./add-page.page.scss'],
})
export class AddPagePage implements OnInit {
  product = {} as Book;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor( 
    private afs:AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }


  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `books/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`books/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log("this.fb:",this.fb);

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("url: ",url);
        }
      });
  }

  
  async addProduct(product: Book){

    if(this.formValidation()){
   const books = this.afs.collection('books').add(product);

   //add id to book
   const booksId = (await books).id;
   await this.afs.collection('books').doc(booksId).update({
    id: booksId,
    image:this.fb,
  });
}else {
  this.showToast("Please complete the form");

}
  }


  //check to see if user has entered their address or not
  formValidation(){
    if (!this.product.name){
      this.showToast("Please enter the book title");
      return false;
    }
    if (!this.product.author){
      this.showToast("Please enter the author name");
      return false;
    }
    if (!this.product.genre){
      this.showToast("Please enter the genre");
      return false;
    }
    if (!this.product.price){
      this.showToast("Please enter the price");
      return false;
    }
    if (!this.product.description){
      this.showToast("Please enter the description");
      return false;
    }
    
    return true;
  }


  showToast (message:string){
    this.toastCtrl.create({
    message: message,
    duration: 3000
    })
    .then(toastData => toastData.present());
    }
  

}
