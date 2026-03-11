import { Form } from 'react-bootstrap';

const TextInput = ({
	name,
	placeholder,
	type = 'text',
	register,
	validation,
	error,
	as,
	value,
}) => (
	<Form.Group className={`form-group ${value ? 'value-added' : ''}`}>
		<Form.Control
			value={value}
			as={as} // This allows switching between input types (e.g., 'textarea')
			className={` ${error ? 'has-error form-control-lg' : 'form-control-lg'}`}
			{...register(name, validation)} // Spread register for form handling
			type={type}
			autoComplete="off"
			placeholder={placeholder}
		/>
		{error && (
			<span className="error-message form-error">{error.message}</span>
		)}
	</Form.Group>
);

export default TextInput;
