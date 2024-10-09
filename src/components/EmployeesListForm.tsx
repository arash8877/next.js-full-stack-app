import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import axios from "axios";
import { employeesInfoProps } from "@/types/index";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";

//------------------------------------ main function -----------------------------------
const EmployeesListForm = ({
  firstName,
  lastName,
  email,
  lastLogin,
}: employeesInfoProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { l } = useLanguageStore();

  //---------------- update user ---------------
  const updateEmployee = async (data: employeesInfoProps) => {
    //function will be called in onSubmit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users`, //PATCH request
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        l("settings.tab1.form.toast.success") ||
          "Employee's info updated successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in /users", error);
      toast.error(
        l("settings.tab1.form.toast.error") || "Something went wrong!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
    }
  };

  //----Yup validation ---------
  const formSchema = Yup.object({
    firstName: Yup.string()
      .required(
        l("settings.tab1.form.firstName.validation.required") ||
          "First name is required!"
      )
      .min(
        2,
        l("settings.tab1.form.firstName.validation.length") ||
          "Company name must be at least 2 characters!"
      ),
    lastName: Yup.string()
      .required(
        l("settings.tab1.form.lastName.validation.required") ||
          "Last name is required!"
      )
      .min(
        2,
        l("settings.tab1.form.firstName.validation.length") ||
          "Company name must be at least 2 characters!"
      ),
    email: Yup.string().required(
      l("register.step1.form.email.validation.required") || "Email is required!"
    ),
    lastLogin: Yup.string().required(
      l("register.step1.form.lastLogin.validation.required") ||
        "Last login is required!"
    ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: firstName,
      lastName: lastName || "",
      email: email || "",
      lastLogin: lastLogin || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: lastName || "",
        email: values.email,
        lastLogin: values.lastLogin,
      };

      updateEmployee(data);
      setIsEditable(false);
    },
    validationSchema: formSchema,
  });

  //---- toggle edit button ----
  const handleToggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  //--------------------------Return---------------------------------
  return (
    <form
      className="flex flex-col gap-6 xl:flex-row"
      onSubmit={formik.handleSubmit}
    >
      <div className="grid gap-7 md:gap-6 xl:w-4/5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">
            {l("settings.tab1.form.firstName.label") || "First Name"}
            <span className="ml-1">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            className="register_input custom-border"
            disabled={!isEditable}
          />
          <small className="text-red-600">
            {formik.touched.firstName && formik.errors.firstName}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">
            {l("settings.tab1.form.lastName.label") || "Last Name"}
            <span className="ml-1">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            className="register_input custom-border"
            disabled={!isEditable}
          />
          <small className="text-red-600">
            {formik.touched.lastName && formik.errors.lastName}
          </small>
        </div>
      </div>

      <div className="grid gap-7 md:gap-6 xl:w-4/5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">
            {l("settings.tab1.form.email.label") || "Email"}
          </label>
          <input
            name="email"
            type="text"
            defaultValue={email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            className="register_input custom-border"
            disabled={!isEditable}
          />
          <small className="text-red-600">
            {formik.touched.email && formik.errors.email}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastLogin">
            {l("settings.tab1.form.email.label") || "Last Login"}
          </label>
          <input
            name="lastLogin"
            type="text"
            defaultValue={email}
            onChange={formik.handleChange("lastLogin")}
            onBlur={formik.handleBlur("lastLogin")}
            className="register_input custom-border"
            disabled={true}
          />
          <small className="text-red-600">
            {formik.touched.lastLogin && formik.errors.lastLogin}
          </small>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4 xl:items-end xl:pb-2">
        <CustomButton
          title={isEditable ? l("settings.form.save") || "Save" : l("settings.form.edit") || "Edit"}
          containerStyles={`rounded-lg h-[48px] ${isEditable ? 'bg-blue-300' : 'gradient-green1'} hover1`}
          btnType="button"
          handleClick={() => {
            if (isEditable) {
              formik.handleSubmit();
            }
            handleToggleEdit();
          }}
        />
        <CustomButton
          title={l("settings.form.submit") || "Delete"}
          containerStyles="rounded-lg h-[48px] bg-bgColor-red hover1"
          textStyles="text-white"
          btnType="button"
        />
      </div>
    </form>
  );
};

export default EmployeesListForm;
