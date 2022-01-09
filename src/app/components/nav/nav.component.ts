import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from '../../services/store.service'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  // profile: User = {
  //   id: '',
  //   email: '',
  //   password: '',
  //   name: ''
  // }


  constructor(
    private storeService: StoreService,
    private authService: AuthService  
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndGetProfile() {
    this.authService.login('ejuarez@hotmail.com','0123456' )
    .pipe(
      switchMap(rta => {       
        //Una vez logeado se guarda el token para su uso posterior
        this.token = rta.access_token;     
        return this.authService.profile(rta.access_token);
      })
    )
    .subscribe(user => {  
      this.profile = user;
    });
  }



}
