import './form-input.scss'

export function FormInput( {label, ...otherProps} ) {
  return (
    <div className="form-input-container">
      <label>{label}</label>
      <input {...otherProps} className="form-input" />
    </div>
  )
}