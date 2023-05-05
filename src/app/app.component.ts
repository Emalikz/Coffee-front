import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coffe-front';

  constructor(private route:Router){

  }

  get isLogin(){
    return this.route.isActive("auth/login",true);
  }
}
