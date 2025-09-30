<template>
  <div class="main-container">
    <h1>Lista de Personas</h1>    
    <button @click="showCreateModal = true" class="create-button">
      Crear Nueva Persona
    </button>

    <PersonsTable 
      :persons="persons" 
      @edit="handleEdit" 
      @delete="handleDelete"
    />

    <CreatePersonModal
      :show="showCreateModal"
      :onClose="closeModals"
      @personCreated="fetchPersons"
    />

    <UpdatePersonModal
      :show="showUpdateModal"
      :onClose="closeModals"
      :person="selectedPerson"
      @personUpdated="fetchPersons"
    />

    <DeletePersonModal
      :show="showDeleteModal"
      :onClose="closeModals"
      :personId="selectedPerson?._id"
      @personDeleted="fetchPersons"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PersonsTable from './components/PersonsTable.vue';
import CreatePersonModal from './components/CreatePersonModal.vue';
import UpdatePersonModal from './components/UpdatePersonModal.vue';
import DeletePersonModal from './components/DeletePersonModal.vue';
import { usePersons } from './composables/usePersons';

const { persons, fetchPersons } = usePersons();
const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const selectedPerson = ref(null);

onMounted(() => {
  fetchPersons();
});

const handleEdit = (person) => {
  selectedPerson.value = person;
  showUpdateModal.value = true;
};

const handleDelete = (person) => {
  console.log('Valor recibido en handleDelete:', person);
  if (!person || !person._id) {
    console.error('ID no válido para eliminar');
    return;
  }
  selectedPerson.value = person;
  showDeleteModal.value = true;
};

const closeModals = () => {
  showCreateModal.value = false;
  showUpdateModal.value = false;
  showDeleteModal.value = false;
  selectedPerson.value = null;
};
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.create-button {
  margin-bottom: 2rem;
}
</style>
