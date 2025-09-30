import { useDeletePerson } from '../hooks/useDeletePerson';

export const DeletePersonModal = ({ show, onClose, personId }) => {
  const { removePerson, isLoading, error: apiError } = useDeletePerson();

  if (!show) return null;

  const handleDelete = async () => {
    try {
      await removePerson(personId);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar a esta persona?</p>
        
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        
        <button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Eliminando...' : 'Si'}
        </button>
        <button onClick={onClose} disabled={isLoading} className="button-danger">
          Cancelar
        </button>
      </div>
    </div>
  );
};
