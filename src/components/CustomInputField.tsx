import Image from "next/image";
import { InviteEmployeeFormProps } from "@/types/index";

export const InputField: React.FC<InviteEmployeeFormProps> = ({
  label,
  name,
  type,
  placeholder,
  formik,
  icon,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-start">
      {label}
      <span className="ml-1">*</span>
    </label>
    <div className="relative">
      {icon && (
        <Image
          src={icon}
          width={20}
          height={16}
          alt={`${name}-icon`}
          className="absolute left-3 top-[59%] transform -translate-y-1/2"
        />
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={String(formik.values[name])}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name] && formik.errors[name]}
    </small>
  </div>
);

