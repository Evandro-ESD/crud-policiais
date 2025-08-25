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
    this.service.getAllPoliciais().subscribe()
  }

  cadastrar() {
    this.service.createPolicial(this.formCadastro.value).subscribe()


  }

}
