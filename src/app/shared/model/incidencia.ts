import { Cita } from './cita';
export class Incidencia {
    id: number;
    descripcion: string;
    fecha: string;
    tipo: string;
    created_at: string;
    citas: Cita[];
}
