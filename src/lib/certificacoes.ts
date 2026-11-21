import type { Certification } from '@/types';

/** Carga horária em horas a partir de textos como "18,5 horas" (0 quando não informada). */
export const horasDe = (c: Pick<Certification, 'hours'>) => parseFloat(String(c.hours ?? '').replace(',', '.')) || 0;
