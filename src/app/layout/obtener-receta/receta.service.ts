import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  url: string = environment.url + 'api/receta/';

  constructor(private http: HttpClient) { }

  public obtenerRecetasById(data: any) {
    let url_final: string = this.url + 'obtener-id';
    return this.http.post(url_final, data);
  }

  public obtenerRecetasByRun(data: any) {
    let url_final: string = this.url + 'obtener-run';
    return this.http.post(url_final, data);
  }

  public registrarRecetas(data: any) {
    let url_final: string = this.url + 'registrar';
    return this.http.post(url_final, data);
  }

  public modificarRecetas(data: any) {
    let url_final: string = this.url + 'modificar';
    return this.http.post(url_final, data);
  }

  public surtirRecetas(data: any) {
    let url_final: string = this.url + 'surtir';
    return this.http.post(url_final, data);
  }

}
