import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  url: string = environment.url + 'api/cita/';

  constructor(private http: HttpClient) { }

  public obtenerCitasById(data: any) {
    let url_final: string = this.url + 'obtener-id';
    return this.http.post(url_final, data);
  }

  public obtenerCitasByRun(data: any) {
    let url_final: string = this.url + 'obtener-run';
    return this.http.post(url_final, data);
  }

  public obtenerMedicos() {
    let url_final: string = this.url + 'medicos';
    return this.http.post(url_final, {});
  }

  public registrarCita(data: any) {
    let url_final: string = this.url + 'registrar';
    return this.http.post(url_final, data);
  }

  public cancelarCita(data: any) {
    let url_final: string = this.url + 'cancelar';
    return this.http.post(url_final, data);
  }

  public notificarCita(data: any) {
    let url_final: string = this.url + 'notificar';
    return this.http.post(url_final, data);
  }

}
