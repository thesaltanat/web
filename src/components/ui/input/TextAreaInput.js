import {Form} from 'react-bootstrap';

const TextAreaInput = ({ name, placeholder, rows, register, validation, error }) => (
    <div className="form-group">
        <Form.Group>
      <textarea
          className={error ? 'has-error form-control-lg textarea form-control' : 'textarea form-control form-control-lg'}
          {...register(name, validation)}
          placeholder={placeholder}
          rows={rows}
      />
            {error && <span className="error-message form-error">{error.message}</span>}
        </Form.Group>
    </div>
);


export default TextAreaInput;
