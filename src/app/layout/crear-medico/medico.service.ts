import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url: string = environment.url + 'api/medico/';

  constructor(private http: HttpClient) { }

  public registrarMedico(data: any) {
    let url_final: string = this.url + 'registrar';
    return this.http.post(url_final, data);
  }
}
