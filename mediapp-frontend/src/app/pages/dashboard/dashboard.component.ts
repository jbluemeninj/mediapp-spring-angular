import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService } from '../../service/menu.service';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  username: string;

  constructor(private menuService: MenuService){

  }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));
    this.username = decodeToken.sub;

    this.menuService.getMenusByUser(this.username).subscribe(data => {
      this.menuService.setMenuChange(data);
    });
  }


}
