import { useState } from 'react';
import { updatePerson as updatePersonApi } from '../Api/personsApi';

export const useUpdatePerson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePerson = async (id, personData) => {
    setIsLoading(true);
    setError(null);
    try {
      await updatePersonApi(id, personData);
    } catch (err) {
      let errorMessage = 'Ocurrió un error inesperado al actualizar.';

      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const validationErrors = err.response.data.errors;
          errorMessage = Object.values(validationErrors)
            .map(error => error.message)
            .join(' ');
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      setError(errorMessage);
      throw err;
      
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePerson, isLoading, error };
};
