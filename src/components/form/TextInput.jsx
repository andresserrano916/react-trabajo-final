import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

const TextInput = ({input, width, type, placeholder, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <Input {...input} placeholder={placeholder}/>
            {touched && error && (
                <Label basic color="red" pointing>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default TextInput;
