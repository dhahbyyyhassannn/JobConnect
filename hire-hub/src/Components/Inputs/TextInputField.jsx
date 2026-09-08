import './TextInputField.css';

export default function TextInputField({
  icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  className = '',
  label,
  name,
  accept
}) {
  return (
    <>
        <label className='text-input-label'>
            { label }
        </label>
        <div className={`input-field-container ${type === 'file' ? 'file-input-field' : ''} ${className}`.trim()}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
            type={type}
            name={name}
            accept={accept}
            className={`input-style ${type === 'file' ? 'file-input-style' : ''}`.trim()}
            placeholder={placeholder}
            value={type === 'file' ? undefined : value}
            onChange={onChange}
        />
        </div>
    </>
  );
}