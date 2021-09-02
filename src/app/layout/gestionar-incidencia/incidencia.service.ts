import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  url: string = environment.url + 'api/incidencia/';

  constructor(private http: HttpClient) { }

  public obtenerIncidencias() {
    let url_final: string = this.url + 'obtener';
    return this.http.post(url_final, {});
  }

  public obtenerMedicos() {
    let url_final: string = this.url + 'medicos';
    return this.http.post(url_final, {});
  }

  public registrarInicidencia(data: any) {
    let url_final: string = this.url + 'registrar';
    return this.http.post(url_final, data);
  }
}
