
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PersonalDetailsStep } from './components/PersonalDetailsStep';
import { ContactInfoStep } from './components/ContactInfoStep';
import { TrainingPrefsStep } from './components/TrainingPrefsStep';
import { SummaryStep } from './components/SummaryStep';
import type { FormData } from './types';

const steps = ['Personal Info', 'Contact Info', 'Training Goals', 'Summary'];

const initialValues: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  codigoPostal: '',
  tipoEntrenamiento: '',
  objetivos: '',
  disponibilidad: [],
};

const validationSchemas = [
  Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Introduce un email válido').required('El email es obligatorio'),
    telefono: Yup.string().matches(/^[0-9]+$/, "Debe ser solo números").min(9, 'Debe tener al menos 9 dígitos').required('El teléfono es obligatorio'),
  }),
  Yup.object({
    direccion: Yup.string().required('La dirección es obligatoria'),
    ciudad: Yup.string().required('La ciudad es obligatoria'),
    codigoPostal: Yup.string().required('El código postal es obligatorio').matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos'),
  }),
  Yup.object({
    tipoEntrenamiento: Yup.string().required('Selecciona un tipo de entrenamiento'),
    objetivos: Yup.string().required('Describe tus objetivos'),
    disponibilidad: Yup.array().min(1, 'Selecciona al menos un día'),
  }),
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const isLastStep = currentStep === steps.length - 1;
  const currentValidationSchema = validationSchemas[currentStep];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (values: FormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(true);
    setSubmissionError(null);
    try {
      // Simulate the API call from the PDF since 'https://api.fitlife.com/registro' is a placeholder and doesn't exist.
      console.log("Simulating API call with data:", values);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Since the API is a placeholder, we'll simulate a response.
      if (Math.random() > 0.1) { // Simulate 90% success rate
        console.log('Usuario registrado correctamente', values);
        setSubmitted(true);
      } else {
        throw new Error('Error al registrar usuario. Por favor, inténtelo de nuevo.');
      }
    } catch (error: unknown) {
      console.error('Simulated API Error:', error);
      if (error instanceof Error) {
        setSubmissionError(error.message);
      } else {
        setSubmissionError('An unknown error occurred.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-teal-400 mb-2">FitLife Gym</h1>
        <p className="text-center text-slate-300 mb-8">Únete a nosotros en tu viaje hacia una vida más saludable.</p>

        {submitted ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 text-center shadow-2xl">
              <svg className="w-16 h-16 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h2 className="text-2xl font-bold mt-4 text-white">¡Registro completado!</h2>
              <p className="text-slate-300 mt-2">¡Bienvenido a FitLife! Hemos recibido tus datos y te contactaremos pronto.</p>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= index ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {currentStep > index ? '✓' : index + 1}
                      </div>
                      <p className={`mt-2 text-xs transition-all duration-300 ${currentStep >= index ? 'text-teal-400' : 'text-slate-400'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${currentStep > index ? 'bg-teal-500' : 'bg-slate-700'}`}></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={currentValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, validateForm, setTouched }) => (
                <Form>
                  {currentStep === 0 && <PersonalDetailsStep />}
                  {currentStep === 1 && <ContactInfoStep />}
                  {currentStep === 2 && <TrainingPrefsStep />}
                  {currentStep === 3 && <SummaryStep values={values} />}

                  {submissionError && (
                    <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
                      {submissionError}
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 transition-colors"
                      disabled={currentStep === 0}
                    >
                      Atrás
                    </button>
                    {!isLastStep ? (
                       <button
                         type="button"
                         onClick={async () => {
                            const errors = await validateForm();
                            const currentStepFields = Object.keys(validationSchemas[currentStep].fields);
                            const stepErrors = Object.keys(errors).filter(field => currentStepFields.includes(field));
                            
                            if (stepErrors.length === 0) {
                                handleNext();
                            } else {
                                // Mark fields as touched to show errors
                                const touchedFields = currentStepFields.reduce((acc, field) => {
                                    acc[field] = true;
                                    return acc;
                                }, {} as { [key: string]: boolean });
                                setTouched(touchedFields);
                            }
                         }}
                         className="px-6 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-500 transition-colors"
                       >
                         Siguiente
                       </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? 'Enviando...' : 'Confirmar Registro'}
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
