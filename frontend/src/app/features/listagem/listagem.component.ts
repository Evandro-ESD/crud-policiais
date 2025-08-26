import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataBrPipe } from '../../shared/pipes/data-br.pipe';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';


@Component({
  selector: 'app-listagem',
  imports: [DataBrPipe, CpfPipe],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {

  _listaTodosPoliciais: any[] = [];

  constructor(private service: AuthService) { }

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

}
