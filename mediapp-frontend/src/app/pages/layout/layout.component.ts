import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { Menu } from '../../model/menu';
import { LoginService } from '../../service/login.service';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgFor],
})
export class LayoutComponent implements OnInit {
  menus: Menu[];

  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe((data) => {
      this.menus = data;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
