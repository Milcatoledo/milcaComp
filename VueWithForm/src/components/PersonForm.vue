<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    formData: {
        type: Object,
        required: true
    },
    errors: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['update:formData']);

// Mantener sincronizado el formData local con el props
const formDataLocal = ref({ ...props.formData });
watch(() => props.formData, (newVal) => {
    formDataLocal.value = { ...newVal };
});

const handleInput = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validaciones básicas para UX
    if (name === 'dni' && value.length > 10) {
        newValue = value.slice(0, 10);
    }

    formDataLocal.value = {
        ...formDataLocal.value,
        [name]: newValue
    };
    
    emit('update:formData', formDataLocal.value);
};
</script>

<template>
    <div class="form-group">
        <label for="dni"></label>
        <input 
            id="dni"
            type="text" 
            name="dni" 
            :value="formDataLocal.dni || ''"
            @input="handleInput"
            placeholder="DNI (10 dígitos numericos)" 
            :class="{ error: errors.dni }"
            required 
        />
        <span v-if="errors.dni" class="error-message">{{ errors.dni.message }}</span>
    </div>

    <div class="form-group">
        <label for="nombres"></label>
        <input 
            id="nombres"
            type="text" 
            name="nombres" 
            :value="formDataLocal.nombres || ''"
            @input="handleInput"
            placeholder="Nombres" 
            :class="{ error: errors.nombres }"
            required 
        />
        <span v-if="errors.nombres" class="error-message">{{ errors.nombres.message }}</span>
    </div>

    <div class="form-group">
        <label for="apellidos"></label>
        <input 
            id="apellidos"
            type="text" 
            name="apellidos" 
            :value="formDataLocal.apellidos || ''"
            @input="handleInput"
            placeholder="Apellidos" 
            :class="{ error: errors.apellidos }"
            required 
        />
        <span v-if="errors.apellidos" class="error-message">{{ errors.apellidos.message }}</span>
    </div>

    <div class="form-group">
        <label for="fechaNacimiento"></label>
        <input 
        id="fechaNacimiento"
        type="date" 
        name="fechaNacimiento" 
        :value="formDataLocal.fechaNacimiento || ''" 
        @input="handleInput" 
        :class="{ error: errors.fechaNacimiento }"
        required 
        />
        <span v-if="errors.fechaNacimiento" class="error-message">{{ errors.fechaNacimiento.message }}</span>
    </div>
    
    <div class="form-group">
        <label for="genero">Género:</label>
        <select 
        id="genero" 
        name="genero" 
        :value="formDataLocal.genero || 'Masculino'" 
        @input="handleInput"
        :class="{ error: errors.genero }"
        required
        >
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
        </select>
        <span v-if="errors.genero" class="error-message">{{ errors.genero.message }}</span>
    </div>
    
    <div class="form-group">
        <label for="ciudad">Ciudad:</label>
        <select 
            id="ciudad" 
            name="ciudad" 
            :value="formDataLocal.ciudad || 'Milagro'" 
            @input="handleInput"
            :class="{ error: errors.ciudad }"
            required
        >
            <option value="Milagro">Milagro</option>
            <option value="Guayaquil">Guayaquil</option>
            <option value="Quito">Quito</option>
            <option value="Otra">Otra</option>
        </select>
        <span v-if="errors.ciudad" class="error-message">{{ errors.ciudad.message }}</span>
        </div>
</template>
