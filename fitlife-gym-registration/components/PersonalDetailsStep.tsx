
import React from 'react';
import { FormikField } from './FormikField';

export const PersonalDetailsStep: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Datos Personales</h2>
      <FormikField name="nombre" label="Nombre Completo" type="text" placeholder="Ej: Juan Pérez" />
      <FormikField name="email" label="Correo Electrónico" type="email" placeholder="ej: juan.perez@email.com" />
      <FormikField name="telefono" label="Teléfono" type="tel" placeholder="Ej: 600123456" />
    </div>
  );
};
