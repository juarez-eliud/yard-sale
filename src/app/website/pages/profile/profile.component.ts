import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/users.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    /* Si ingresa a profile es porque el guard dejó acceder entonces 
    se tiene datos de un usuario */
    this.authService.user$.subscribe(data => {
      this.user = data;
    });
  
  }

}
