import React from 'react';

const Select = ({ name, value, error = "", label, onChange, children, multiple = false }) => {
    return (
        <div className="form-group">
            <label htmlFor={ name }>{ label }</label>
            <select name={ name } id={ name } value={ value } className={ "form-control" + (error && " is-invalid")} onChange={ onChange } multiple={ multiple }>
                { children }
            </select>
            <p className="invalid-feedback">{ error }</p>
        </div>
    );
}
 
export default Select;