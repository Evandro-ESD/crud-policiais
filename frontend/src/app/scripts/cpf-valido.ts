import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value ?? '').toString();

    // remove tudo que não for dígito
    const cpf = raw.replace(/\D/g, '');

    // precisa ter 11 dígitos
    if (cpf.length !== 11) return { cpf: 'length' };

    // rejeita CPFs com todos os dígitos iguais (000..., 111..., etc.)
    if (/^(\d)\1{10}$/.test(cpf)) return { cpf: 'repeated' };

    // calcula dígito verificador
    const calcDv = (base: string, factorStart: number) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base[i], 10) * (factorStart - i);
      }
      const mod = (sum * 10) % 11;
      return mod === 10 ? 0 : mod;
    };

    const dv1 = calcDv(cpf.substring(0, 9), 10);
    const dv2 = calcDv(cpf.substring(0, 10), 11);

    const ok = dv1 === parseInt(cpf[9], 10) && dv2 === parseInt(cpf[10], 10);
    return ok ? null : { cpf: 'checksum' };
  };
}
