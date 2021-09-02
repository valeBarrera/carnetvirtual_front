import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = environment.url + 'api/usuario/';
  url_pac: string = environment.url + 'api/paciente/';
  url_far: string = environment.url + 'api/farmacia/';
  url_mes: string = environment.url + 'api/meson/';
  url_med: string = environment.url + 'api/medico/';

  constructor(private http: HttpClient) { }

  public listaUsuarios() {
    let url_final: string = this.url + 'all';
    return this.http.post(url_final, {});
  }

  public resetPassword(data: any) {
    let url_final: string = this.url + 'reset_password';
    return this.http.post(url_final, data);
  }

  public modificarPaciente(data: any) {
    let url_final: string = this.url_pac + 'modificar';
    return this.http.post(url_final, data);
  }

  public modificarMeson(data: any) {
    let url_final: string = this.url_mes + 'modificar';
    return this.http.post(url_final, data);
  }

  public modificarMedico(data: any) {
    let url_final: string = this.url_med + 'modificar';
    return this.http.post(url_final, data);
  }

  public modificarFarmacia(data: any) {
    let url_final: string = this.url_far + 'modificar';
    return this.http.post(url_final, data);
  }

}
