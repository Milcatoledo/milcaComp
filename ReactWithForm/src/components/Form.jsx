export const PersonForm = ({ formData, handleChange, errors = {} }) => {
  const validateInput = (e) => {
    const { name, value } = e.target;
    
    // Validación básica solo para longitud del DNI
    if (name === 'dni' && value.length > 10) {
      e.target.value = value.slice(0, 10);
      return;
    }

    handleChange(e);
  };

  return (
    <>
      <div className="form-group">
        <input 
          type="text" 
          name="dni" 
          value={formData.dni || ''} 
          onChange={validateInput}
          placeholder="DNI (10 dígitos numericos)" 
          className={errors.dni ? 'error' : ''}
          maxLength={10}
          required 
        />
        {errors.dni && <span className="error-message">{errors.dni.message}</span>}
      </div>

      <div className="form-group">
        <input 
          type="text" 
          name="nombres" 
          value={formData.nombres || ''} 
          onChange={validateInput}
          placeholder="Nombres" 
          className={errors.nombres ? 'error' : ''}
          required 
        />
        {errors.nombres && <span className="error-message">{errors.nombres.message}</span>}
      </div>

      <div className="form-group">
        <input 
          type="text" 
          name="apellidos" 
          value={formData.apellidos || ''} 
          onChange={validateInput}
          placeholder="Apellidos" 
          className={errors.apellidos ? 'error' : ''}
          required 
        />
        {errors.apellidos && <span className="error-message">{errors.apellidos.message}</span>}
      </div>

      <div className="form-group">
        <input 
          type="date" 
          name="fechaNacimiento" 
          value={formData.fechaNacimiento || ''} 
          onChange={handleChange} 
          className={errors.fechaNacimiento ? 'error' : ''}
          required 
        />
        {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="genero">Género: </label>
        <select 
          id="genero" 
          name="genero" 
          value={formData.genero || 'Masculino'} 
          onChange={handleChange}
          className={errors.genero ? 'error' : ''}
          required
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.genero && <span className="error-message">{errors.genero.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="ciudad">Ciudad: </label>
        <select 
          id="ciudad" 
          name="ciudad" 
          value={formData.ciudad || 'Milagro'} 
          onChange={handleChange}
          className={errors.ciudad ? 'error' : ''}
          required
        >
          <option value="Milagro">Milagro</option>
          <option value="Guayaquil">Guayaquil</option>
          <option value="Quito">Quito</option>
          <option value="Otra">Otra</option>
        </select>
        {errors.ciudad && <span className="error-message">{errors.ciudad.message}</span>}
      </div>
    </>
  );
};
