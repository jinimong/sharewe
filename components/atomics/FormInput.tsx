import React from 'react';

type FormInputProps = {
  fieldName: string;
  [x: string]: any;
};

const FormInput: React.FC<FormInputProps> = ({ fieldName, ...rest }) => (
  <div className="w-full flex items-center justify-between space-x-6 rounded border border-gray-600 p-4">
    <label htmlFor={fieldName} className="uppercase w-1/3">
      {fieldName}
    </label>
    <input
      id={fieldName}
      {...rest}
      className="text-right disabled:text-gray-400 disabled:bg-transparent"
    />
  </div>
);

export default FormInput;
