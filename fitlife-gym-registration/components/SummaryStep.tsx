
import React from 'react';
import type { FormData } from '../types';

interface SummaryStepProps {
  values: FormData;
}

const SummaryItem: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

export const SummaryStep: React.FC<SummaryStepProps> = ({ values }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Revisa tu Información</h2>
      <div className="border-t border-b border-slate-600 divide-y divide-slate-600">
        <SummaryItem label="Nombre Completo" value={values.nombre} />
        <SummaryItem label="Email" value={values.email} />
        <SummaryItem label="Teléfono" value={values.telefono} />
        <SummaryItem label="Dirección" value={`${values.direccion}, ${values.ciudad}, ${values.codigoPostal}`} />
        <SummaryItem label="Entrenamiento" value={values.tipoEntrenamiento} />
        <SummaryItem label="Objetivos" value={values.objetivos} />
        <SummaryItem label="Disponibilidad" value={values.disponibilidad.join(', ')} />
      </div>
       <p className="mt-6 text-sm text-slate-400">
        Al hacer clic en "Confirmar Registro", aceptas nuestros Términos de Servicio y Política de Privacidad.
      </p>
    </div>
  );
};
