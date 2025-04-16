import { Controller, useFormContext } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { IFormProps } from "../formInterface/forms.model";
import { FormFieldError } from "../formFieldError/FormFieldError";
import { useMemo } from "react";

export const TextArea = (props: IFormProps) => {
  const { attribute, form, fieldType } = props;
  const { label, placeholder } = form[attribute];
  const { required, maxLength, rows, disabled } = form[attribute].rules;
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { labelClassName, fieldClassName, divClassName } = useMemo(() => {
    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
      case IFormFieldType.TOP_LABEL:
        return {
          labelClassName: "",
          fieldClassName: "field p-fluid",
          divClassName: "",
        };
      default:
        return {
          labelClassName: "col-12 mb-3 md:col-3 md:mb-0",
          fieldClassName: "field grid",
          divClassName: "col-12 md:col-9 relative",
        };
    }
  }, [fieldType]);

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      <span className="capitalize-first">
        {label} {required && "*"}
      </span>
    </label>
  );

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <Controller
          control={control}
          name={attribute}
          rules={inputValidator(form[attribute].rules, label)}
          render={({ field }) => {
            return (
              <InputTextarea
                {...field}
                value={field.value}
                id={attribute}
                {...register(attribute, {
                  ...inputValidator(form[attribute].rules, label),
                })}
                className={`p-inputgroup ${
                  errors[attribute] ? "p-invalid" : ""
                }`}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
              />
            );
          }}
        />

        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
