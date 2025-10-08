<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
        <h2>Crear Nueva Persona</h2>
        <PersonForm
            v-model:formData="formData"
            :errors="errors"
        />
        <div class="button-group">
            <button @click="handleSubmit" :disabled="creating">
            {{ creating ? 'Creando...' : 'Crear Persona' }}
            </button>
            <button @click="onClose" class="button-danger">Cancelar</button>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PersonForm from './PersonForm.vue';
import { useCreatePerson } from '../composables/usePersons';

const props = defineProps({
    show: Boolean,
    onClose: Function
});

const emit = defineEmits(['personCreated']);
const { createPerson, creating, error: apiError } = useCreatePerson();
const formData = ref({
    genero: 'Masculino',
    ciudad: 'Milagro'
});
const errors = ref({});
const error = ref(null);

const handleSubmit = async () => {
    errors.value = {};
    error.value = null;
    
    try {
        await createPerson(formData.value);
        emit('personCreated');
        props.onClose();
        formData.value = {
            genero: 'Masculino',
            ciudad: 'Milagro'
        };
    } catch (err) {
        // errores de validación específicos
        if (err.errors) {
            errors.value = err.errors;
        }
        // mensaje específico 
        else if (err.message) {
            if (err.message.toLowerCase().includes('dni')) {
                errors.value = {
                    dni: { message: err.message }
                };
            } else {
                error.value = err.message;
            }
        }
        // Cualquier otro tipo de error
        else {
            error.value = 'Error al crear la persona';
        }
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
</style>