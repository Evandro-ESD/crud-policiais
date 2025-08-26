import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; // lib instalada
import { CommonModule } from '@angular/common';



@Component({
  imports:[ReactiveFormsModule, CommonModule],
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'] // corrigido "styleUrls"
})
export class CadastroComponent implements OnInit {
  service = inject(AuthService);

  _listaTodosPoliciais: any[] = [];
  listaCadastro: boolean = false;
  editando: boolean = false; // controle de edição
  idEditando: number | null = null;

  fb = inject(FormBuilder);

  formCadastro = this.fb.group({
    rg_civil: ['', Validators.required],
    rg_militar: ['', Validators.required],
    cpf: ['', [Validators.required, this.validaCpf]], // custom validator
    data_nascimento: ['', Validators.required],
    matricula: ['', Validators.required]
  });

  ngOnInit() {
    this.service.getAllPoliciais().subscribe({
      next: (response: any) => {
        this._listaTodosPoliciais = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  openCadastro() {
    this.listaCadastro = true;
    this.editando = false;
    this.formCadastro.reset();
  }

  closeCadastro() {
    this.listaCadastro = false;
  }

  // ---------- CRUD ----------
  cadastrar() {
    if (this.formCadastro.invalid) return;

    if (this.editando && this.idEditando) {
      // EDITAR
      this.service.updatePolicial(this.idEditando, this.formCadastro.value).subscribe({
        next: () => {
          const index = this._listaTodosPoliciais.findIndex(p => p.id === this.idEditando);
          this._listaTodosPoliciais[index] = { id: this.idEditando, ...this.formCadastro.value };
          this.closeCadastro();
        }
      });
    } else {
      // CADASTRAR
      this.service.createPolicial(this.formCadastro.value).subscribe({
        next: (novo: any) => {
          this._listaTodosPoliciais.push(novo);
          this.closeCadastro();
        }
      });
    }
    // this.closeCadastro();
  }

  openEditar(id: number, policial: any) {
    this.listaCadastro = true;
    this.editando = true;
    this.idEditando = id;
    this.formCadastro.patchValue(policial);
  }

  excluir(id: number) {
    this.service.deletePolicial(id).subscribe({
      next: () => {
        this._listaTodosPoliciais = this._listaTodosPoliciais.filter(p => p.id !== id);
      }
    });
  }

  // ---------- VALIDADORES ----------
  validaCpf(control: any) {
    const value = control.value;
    if (value && !cpf.isValid(value)) {
      return { cpfInvalido: true };
    }
    return null;
  }
}
