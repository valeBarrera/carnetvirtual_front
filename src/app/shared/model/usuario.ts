import { Paciente } from './paciente';
import { Medico } from './medico';
import { Farmacia } from './farmacia';
import { Meson } from './meson';
import { Rol } from './rol';
export class Usuario {
  id: number;
  username: string;
  email: string;
  token: string;
  token_date: string;
  rol_id: number;
  meson: Meson;
  farmacia: Farmacia;
  medico: Medico;
  paciente: Paciente;
  rol: Rol;
}
