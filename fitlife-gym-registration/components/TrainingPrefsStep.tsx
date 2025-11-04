
import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import { FormikField } from './FormikField';

const CheckboxField: React.FC<{ name: string, value: string, label: string }> = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return (
    <label className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-teal-500 cursor-pointer transition-colors">
      <input type="checkbox" {...field} {...props} className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
      <span className="text-slate-200">{label}</span>
    </label>
  );
};

export const TrainingPrefsStep: React.FC = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Preferencias de Entrenamiento</h2>
      <FormikField name="tipoEntrenamiento" label="Tipo de Entrenamiento Principal" as="select">
        <option value="">Selecciona una opción</option>
        <option value="cardio">Cardio</option>
        <option value="fuerza">Entrenamiento de Fuerza</option>
        <option value="flexibilidad">Flexibilidad y Yoga</option>
        <option value="funcional">Entrenamiento Funcional</option>
      </FormikField>
      <FormikField name="objetivos" label="¿Cuáles son tus objetivos?" as="textarea" placeholder="Ej: Perder peso, ganar músculo, mejorar mi resistencia..." />
      
      <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">Disponibilidad Semanal</label>
          <div role="group" aria-labelledby="checkbox-group" className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {days.map(day => (
              <CheckboxField key={day} name="disponibilidad" value={day} label={day} />
            ))}
          </div>
          <ErrorMessage name="disponibilidad" component="div" className="text-red-400 text-xs mt-2" />
      </div>
    </div>
  );
};
