import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function usePersons() {
  const persons = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPersons = async () => {
    loading.value = true;
    try {
      const response = await axios.get(API_URL);
      persons.value = response.data;
      error.value = null;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar las personas';
      console.error('Error fetching persons:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchPersons);

  return {
    persons,
    loading,
    error,
    fetchPersons
  };
}

export function useCreatePerson() {
  const creating = ref(false);
  const error = ref(null);

  const createPerson = async (personData) => {
    creating.value = true;
    try {
      const response = await axios.post(API_URL, personData);
      error.value = null;
      return response.data;
    } catch (err) {
      let errorMessage = 'Ocurrió un error inesperado.';

      if (err.response?.data) {
        if (err.response.data.errors) {
          // Si hay errores de validación, los pasamos directamente
          throw { errors: err.response.data.errors };
        } 
        else if (err.response.data.message) {
          // Si es un error con mensaje específico (ej: DNI duplicado)
          throw { message: err.response.data.message };
        }
      }

      error.value = errorMessage;
      throw err;
    } finally {
      creating.value = false;
    }
  };

  return {
    creating,
    error,
    createPerson
  };
}

export function useUpdatePerson() {
  const updating = ref(false);
  const error = ref(null);

  const updatePerson = async (id, personData) => {
    updating.value = true;
    try {
      const response = await axios.put(`${API_URL}/${id}`, personData);
      error.value = null;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.errors || err.response?.data?.message || 'Error al actualizar la persona';
      throw error.value;
    } finally {
      updating.value = false;
    }
  };

  return {
    updating,
    error,
    updatePerson
  };
}

export function useDeletePerson() {
  const deleting = ref(false);
  const error = ref(null);

  const deletePerson = async (id) => {
    if (!id) {
      throw new Error('No se puede eliminar: ID no válido');
    }

    deleting.value = true;
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      error.value = null;
      return response.data;
    } catch (err) {
      let errorMessage = 'Error al eliminar la persona';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message && err.message.includes('404')) {
        errorMessage = 'La persona no fue encontrada';
      } else if (err.message && err.message.includes('400')) {
        errorMessage = 'ID no válido';
      }
      
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      deleting.value = false;
    }
  };

  return {
    deleting,
    error,
    deletePerson
  };
}