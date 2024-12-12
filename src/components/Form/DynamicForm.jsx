import React, { useState } from "react";

export const DynamicForm = ({ formSchema }) => {
  const [formData, setFormData] = useState(
    formSchema.reduce((acc, field) => {
      acc[field.name] = ""; // initialize empty values
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      let found = false
      for (let i = index + 1; i < form.elements.length; i++) { 
        const element = form.elements[i]
        if (!element.disabled && element.type !== 'submit') { 
          form.elements[i].focus(); 
          found = true
          break; 
        }
      }
      if(!found){   
        return handleSubmit(e)
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const renderInput = (field) => {
    const InputComponent = field.component;
    return (
      <InputComponent
        key={field.name}
        label={field.label}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      {formSchema.map((field) => renderInput(field))}
      <button type="submit">Submit</button>
    </form>
  );
};
