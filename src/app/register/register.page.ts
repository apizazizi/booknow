import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}