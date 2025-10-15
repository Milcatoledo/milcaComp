import React, { useState } from 'react';
import { useFetchPersons } from '../hooks/useFetchPersons';
import { PersonsTable } from './PersonsTable';
import { CreatePersonModal } from './CreatePersonModal';
import { UpdatePersonModal } from './UpdatePersonModal';
import { DeletePersonModal } from './DeletePersonModal';

export const PersonList = () => {
    const { persons, isLoading, error, fetchPersons } = useFetchPersons();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleEdit = (person) => {
        setSelectedPerson(person);
        setUpdateModalOpen(true);
    };

    const handleDelete = (person) => {
        setSelectedPerson(person);
        setDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setCreateModalOpen(false);
        setUpdateModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedPerson(null);
        fetchPersons();
    };

    return (
        <div>
        <h1>Lista de Personas</h1>
        <button onClick={() => setCreateModalOpen(true)}>Crear Nueva Persona</button>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <PersonsTable 
            persons={persons} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            isLoading={isLoading}
        />


        {isCreateModalOpen && (
            <CreatePersonModal 
            show={isCreateModalOpen} 
            onClose={handleCloseModals} 
            />
        )}

        {isUpdateModalOpen && selectedPerson && (
            <UpdatePersonModal 
            show={isUpdateModalOpen} 
            onClose={handleCloseModals} 
            person={selectedPerson} 
            />
        )}

        {isDeleteModalOpen && selectedPerson && (
            <DeletePersonModal 
            show={isDeleteModalOpen} 
            onClose={handleCloseModals} 
            personId={selectedPerson._id} 
            />
        )}
        </div>
    );
};
