import { useState } from 'react';
import { createPerson as createPersonApi } from '../Api/personsApi';

export const useCreatePerson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPerson = async (personData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createPersonApi(personData);
    } catch (err) {
      let errorMessage = 'Ocurrió un error inesperado.';

      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const validationErrors = err.response.data.errors;
          errorMessage = Object.values(validationErrors)
            .map(error => error.message)
            .join(' ');
        } 
        else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      setError(errorMessage);
      throw err;

    } finally {
      setIsLoading(false);
    }
  };

  return { createPerson, isLoading, error };
};
