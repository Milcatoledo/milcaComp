<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar a esta persona?</p>
        <div class="button-group">
            <button @click="handleDelete" :disabled="deleting">
            {{ deleting ? 'Eliminando...' : 'Si' }}
            </button>
            <button @click="onClose" :disabled="deleting" class="button-danger">
            Cancelar
            </button>
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDeletePerson } from '../composables/usePersons';

const props = defineProps({
    show: Boolean,
    onClose: Function,
    personId: String
});

const emit = defineEmits(['personDeleted']);
const { deletePerson, deleting } = useDeletePerson();
const error = ref(null);

const handleDelete = async () => {
    error.value = null;
    try {
        if (!props.personId) {
        error.value = 'No se puede eliminar: ID no proporcionado';
        return;
        }
        await deletePerson(props.personId);
        emit('personDeleted');
        props.onClose();
    } catch (err) {
        error.value = err.message;
        console.error('Error al eliminar:', err);
    }
    };
</script>

<style scoped>
    .button-group {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
    }

    .error-message {
    color: #e04e6b;
    text-align: center;
    margin-top: 1rem;
    }

    .button-danger {
    background-color: #e04e6b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    }
</style>
