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
            <td>{{ new Date(person.fechaNacimiento).toLocaleDateString() }}</td>
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
