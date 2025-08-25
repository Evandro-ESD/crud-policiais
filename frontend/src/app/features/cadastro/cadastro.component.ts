import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  service = inject(AuthService)

  _listaTodosPoliciais: any[] = [ ]

  listaCadastro:boolean = false;


  formCadastro = inject(FormBuilder).group({
    rg_civil:[],
    rg_militar:[],
    cpf:[],
    data_nascimento: [],
    matricula:[]
  }
  )
  ngOnInit() {
    this.service.listaTodosPoliciais
    this.service.getAllPoliciais().subscribe({
      next: (response: any) => {

      // adicionar os objetos na lista para exibir em tela
        this._listaTodosPoliciais = response;
        console.log(this._listaTodosPoliciais)
      },
      error: (error: any) => {
        console.error(error);
      }
      
    })
  }

  cadastrar() {
    this.service.createPolicial(this.formCadastro.value).subscribe()
  }

  excluir(id: number) {
    this.service.deletePolicial(id).subscribe()
  }


}
