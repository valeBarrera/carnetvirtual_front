import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  url: string = environment.url + 'api/farmacia/';

  constructor(private http: HttpClient) { }

  public registrarFarmacia(data: any) {
    let url_final: string = this.url + 'registrar';
    return this.http.post(url_final, data);
  }
}
