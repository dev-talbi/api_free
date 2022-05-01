import React from "react";

export default function Field({
                                  name,
                                  label,
                                  value,
                                  onChange,
                                  placeholder = "",
                                  type = "text",
                                  error = "",
                              }) {
    return (
        <div className="form-group input-register">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                placeholder={placeholder || label}
                name={name}
                id={name}
                className={"form-control" + (error ? " is-invalid" : "")}
                value={value}
                onChange={onChange}
            />
            <p className="invalid-feedback text-center">{error}</p>
        </div>
    );
}