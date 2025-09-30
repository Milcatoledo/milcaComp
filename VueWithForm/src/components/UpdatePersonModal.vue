<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
        <h2>Editar Persona</h2>
        <PersonForm
            v-model:formData="localFormData"
            :errors="errors"
        />
        <div class="button-group">
            <button @click="handleSubmit" :disabled="updating">
            {{ updating ? 'Actualizando...' : 'Actualizar' }}
            </button>
            <button @click="onClose" class="button-danger">Cancelar</button>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import PersonForm from './PersonForm.vue';
import { useUpdatePerson } from '../composables/usePersons';

const props = defineProps({
    show: Boolean,
    onClose: Function,
    person: Object
});

const emit = defineEmits(['personUpdated']);
const { updatePerson, updating, error: apiError } = useUpdatePerson();
const localFormData = ref({});
const errors = ref({});
const error = ref(null);

watch(() => props.person, (newPerson) => {
    if (newPerson) {
        const formattedDate = newPerson.fechaNacimiento ? newPerson.fechaNacimiento.split('T')[0] : '';
        localFormData.value = { ...newPerson, fechaNacimiento: formattedDate };
        errors.value = {};
        error.value = null;
    }
}, { immediate: true });

const handleSubmit = async () => {
    errors.value = {};
    error.value = null;
    
    try {
        await updatePerson(props.person._id, localFormData.value);
        emit('personUpdated');
        props.onClose();
    } catch (err) {
        if (err.response?.data?.errors) {
        errors.value = err.response.data.errors;
        } else {
        error.value = err.response?.data?.message || 'Error al actualizar la persona';
        }
    }
};
</script>