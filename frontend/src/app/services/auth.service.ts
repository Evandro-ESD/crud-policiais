import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { cpfValidator } from '../scripts/cpf-valido';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  http = inject(HttpClient)

  listaTodosPoliciais: any[] = []


  getAllPoliciais() {
    return this.http.get('http://localhost:3000/policiais')
  }

  getPolicialById(id: number) {
    return this.http.get(`http://localhost:3000/policiais/${id}`)
  }

  createPolicial(policial: any) {
    return this.http.post('http://localhost:3000/policiais', policial).pipe(

      // adicinar a listaTodosPoliciais
      tap((response: any) => {
        this.listaTodosPoliciais.push(response);
      }),
      map((response: any) => {
        if (response) {
          throw new Error('CPF inválido');
        }
        return response;
      })
    )
  }

  updatePolicial(id: number, policial: any) {
    return this.http.put(`http://localhost:3000/policiais/${id}`, policial)
  }
  deletePolicial(id: number) {
    return this.http.delete(`http://localhost:3000/policiais/${id}`)
  }

}
