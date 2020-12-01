import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({input, width, options, handleOnChange, placeholder, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select value={input.value} onChange={(e, data) => {
                input.onChange(data.value);
                if(handleOnChange){
                    handleOnChange(data.value);
                }
            }} placeholder={placeholder} options={options}/>
            {touched && error && (
                <Label basic color="red" pointing>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default SelectInput;
