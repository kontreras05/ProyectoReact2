
import React from 'react';
import { FormikField } from './FormikField';

export const ContactInfoStep: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Información de Contacto</h2>
      <FormikField name="direccion" label="Dirección" type="text" placeholder="Ej: Calle Falsa 123" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormikField name="ciudad" label="Ciudad" type="text" placeholder="Ej: Madrid" />
        <FormikField name="codigoPostal" label="Código Postal" type="text" placeholder="Ej: 28001" />
      </div>
    </div>
  );
};
