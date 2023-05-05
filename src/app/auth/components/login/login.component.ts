import { Component } from '@angular/core';
import { Login } from '../../types/Login';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _authService:AuthService,private _localStorage:StorageService, private _router:Router){}
  private _login: Login = new Login();
  public get login(): Login {
    return this._login;
  }
  public set login(value: Login) {
    this._login = value;
  }

  public in(){
    this._authService.login(this.login).subscribe(login=>{
      this._localStorage.set("token", login.token)
      this._localStorage.set("user", login.user)
      this._router.navigate(["/products"]);
    },err=>{
      Swal.fire('Error!', err.error.message)
    })
  }
}
