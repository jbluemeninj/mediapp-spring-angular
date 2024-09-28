import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { LoginService } from '../../../service/login.service';

@Component({
  standalone: true,
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
  imports: [MaterialModule, RouterOutlet, FormsModule, NgIf]
})
export class ForgotComponent implements OnInit {

  email: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  sendMail() {
    this.loginService.sendMail(this.email).subscribe(data => {
      if (data === 1) {
        this.message = "Mail sent!"
        this.error = null
      } else {
        this.error = "User not exists";
      }
    });
  }


}
