import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
    url: string = environment.url + 'api/paciente/';

    constructor(private http: HttpClient) { }
    public registrarPaciente(data: any) {
        let url_final: string = this.url + 'registrar';
        return this.http.post(url_final, data);
      }

}
