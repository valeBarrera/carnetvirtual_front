import { Medico } from './medico';
import { Meson } from './meson';
export class Cita {
    id: number;
    fecha: string;
    hora: string;
    estado: string;
    meson: Meson;
    medico: Medico;
    created_at: string;
    updated_at: string;
}
