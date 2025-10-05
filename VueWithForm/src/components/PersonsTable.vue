<template>
    <table>
        <thead>
        <tr>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Género</th>
            <th>Ciudad</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="person in persons" :key="person._id">
            <td>{{ person.dni }}</td>
            <td>{{ person.nombres }}</td>
            <td>{{ person.apellidos }}</td>
            <td>{{ person.genero }}</td>
            <td>{{ person.ciudad }}</td>
            <td>{{ formatDate(person.fechaNacimiento) }}</td>
            <td>
            <button @click="$emit('edit', person)" class="btn-edit">Editar</button>
            <button @click="$emit('delete', person)" class="btn-delete">Eliminar</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    persons: Array
});

// Función para formatear la fecha sin problemas de zona horaria
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Extraer año, mes y día directamente de la cadena ISO
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
};
</script>

<style scoped>
.btn-edit {
    background-color: #5cafb8;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 8px;
    cursor: pointer;
}

.btn-delete {
    background-color: #e04e6b;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
