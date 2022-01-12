import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  // profile: User = {
  //   id: '',
  //   email: '',
  //   password: '',
  //   name: ''
  // }


  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndGetProfile() {
    this.authService.loginAndGetProfile('ejuarez@hotmail.com','0123456')
    .subscribe(user => {  
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }


}
