import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Remove qualquer caractere que não seja número
    const numbers = value.replace(/\D/g, '');

    if (numbers.length !== 11) return value; // CPF inválido

    // Formata: 000.000.000-00
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
