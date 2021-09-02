import { Rol } from './../model/rol';
import { Usuario } from './../model/usuario';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  ROL_MESON: number = 2;
  ROL_FARMACIA: number = 3;
  ROL_MEDICO: number = 4;

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  changePassword(data: any){
    const url = environment.url + 'api/usuario/change_password';
    return this.http.post(url, data);
  }

  login(data: any) {
    const url = environment.url + 'api/usuario/login_web';
    return this.http.post(url, data).pipe(
      map((data: any) => {
        // login successful if there's a jwt token in the response
        if (data.code == 200) {
          const user: Usuario = new Usuario();
          user.id = data.usuario.id;
          user.email = data.usuario.email;
          user.username = data.usuario.username;
          user.rol_id = data.usuario.rol_id;
          user.rol = new Rol();
          user.rol.id = data.usuario.rol.id;
          user.rol.nombre = data.usuario.rol.nombre;
          user.rol.descripcion = data.usuario.rol.descripcion;
          user.token = data.token;
          user.token_date = new Date().toLocaleString();

          switch (user.rol_id) {
            case this.ROL_MESON:
              user.meson = data.usuario.meson;
              break;
            case this.ROL_FARMACIA:
              user.farmacia = data.usuario.farmacia;
              break;
            case this.ROL_MEDICO:
              user.medico = data.usuario.medico;
              break;
          }


          if (user && user.token) {
            this.startRefreshTokenTimer();
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('expire_in', data.expire_in);
            localStorage.setItem('isLoggedin', 'true');
            this.currentUserSubject.next(user);
          }
        }
        return data;
      })
    );
  }

  refreshUser(userRefresh: Usuario): void {
    localStorage.setItem('currentUser', JSON.stringify(userRefresh));
    this.currentUserSubject.next(userRefresh);
  }

  logout() {
    // remove user from local storage to log user out
    const url = environment.url + 'api/usuario/logout';

    return this.http.post(url, {}).subscribe((data) => {
        this.stopRefreshTokenTimer();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('expire_in');
        localStorage.removeItem('is_expirated');
        this.currentUserSubject.next(null);
    });
  }

  isLoggedin() {
    let isLog = localStorage.getItem('isLoggedin') && this.currentUserValue;
    if(!isLog){
        this.logout();
    }
    return isLog;
  }

  logoutExpirate() {
    this.logout();
  }

  refreshToken() {
    const url = environment.url + 'api/usuario/refresh';
    return this.http.post(url, {}).pipe(
      map((data: any) => {
        if (data.state) {
          const user: Usuario = new Usuario();
          user.id = data.usuario.id;
          user.email = data.usuario.email;
          user.username = data.usuario.username;
          user.rol_id = data.usuario.rol_id;
          user.rol = new Rol();
          user.rol.id = data.usuario.rol.id;
          user.rol.nombre = data.usuario.rol.nombre;
          user.rol.descripcion = data.usuario.rol.descripcion;
          user.token = data.token;
          user.token_date = new Date().toLocaleString();

          switch (user.rol_id) {
            case this.ROL_MESON:
              user.meson = data.usuario.meson;
              break;
            case this.ROL_FARMACIA:
              user.farmacia = data.usuario.farmacia;
              break;
            case this.ROL_MEDICO:
              user.medico = data.usuario.medico;
              break;
          }

          if (user && user.token) {
            this.startRefreshTokenTimer();
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('expire_in', data.expire_in);
            this.currentUserSubject.next(user);
          }
        }
      })
    );
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    const seconds: number = Number(localStorage.getItem('expire_in'));
    const timeout = seconds * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  getRole(): Rol {
    let rol: Rol = this.currentUserSubject.value.rol;
    if(rol.id == this.ROL_MESON){
        rol.cargo = this.currentUserSubject.value.meson.cargo;
    }
    if(rol.id == this.ROL_FARMACIA ){
        rol.cargo = this.currentUserSubject.value.farmacia.cargo;
    }
    return rol;
  }
}
