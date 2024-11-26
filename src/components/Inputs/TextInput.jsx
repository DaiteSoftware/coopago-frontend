import React from "react";

export const TextInput = React.memo(({ label, name, value, onChange, error, disabled=false, required=false, max=99, placeholder="", size=1 }) => {
  let classSize = ""
  switch(size){
    case 2:
       classSize = "p-3 text-md"
      break
    case 3:
       classSize = "p-4 text-md"
      break
    default:
      classSize = "p-2.5 text-sm"
  }
  return (
    <div className="mb-2">
      <label className="block mb-1 text-sm font-medium text-gray-900 " htmlFor={name}>{label}</label>
      <input
        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${classSize}`}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        maxLength={max}
        placeholder={placeholder}
      />
      {
        error?.campo === name ? <span className="text-red-500">{error?.mensaje}</span> : <></>
      }
    </div>
  );
});
