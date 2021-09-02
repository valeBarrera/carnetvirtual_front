import { Farmacia } from './farmacia';
import { Medico } from './medico';
export class Receta {
    id: number;
    fecha_emision: string;
    ultima_fecha_surtido: string;
    proximo_retiro: string;
    prescripcion: string;
    indicaciones: string;
    estado: string;
    medico: Medico;
    farmacia: Farmacia;
    created_at: string;
    updated_at: string;
}
