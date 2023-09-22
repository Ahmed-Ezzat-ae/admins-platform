import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import { Fragment } from 'react';

const RadioBtn = ({ name, options }) => {
  const [field] = useField(name);
  return (
    <Fragment>
      {options.map((option) => (
        <Fragment key={option.value}>
          <Form.Check
            className='d-flex justify-content-between flex-row-reverse'
            {...field}
            type="radio"
            label={option.label}
            value={option.value}
            id={`mainAdmin-${option.label}`}
          />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default RadioBtn;
