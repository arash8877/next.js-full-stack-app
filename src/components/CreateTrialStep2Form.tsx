"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CountryDropdown from "./CountryDropdown";
import { AxiosError } from "axios";
import {
  CreateTrialStep2FormProps,
  CreateTrialStep2FormValues,
} from "@/types/index";
import useLanguageStore from "@/stores/language-store";

//--------- Reusable Input Component ---------
const InputField: React.FC<
  CreateTrialStep2FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialStep2FormValues>>;
  }
> = ({ label, name, type, placeholder, formik, icon }) => (
  <div className="flex flex-col">
    <label htmlFor={name}>
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
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={
          formik.values[name as keyof CreateTrialStep2FormValues] as string
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2 custom-border"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name as keyof CreateTrialStep2FormValues] &&
        formik.errors[name as keyof CreateTrialStep2FormValues]}
    </small>
  </div>
);

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep2Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [country, setCountry] = useState("Denmark");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  // eslint-disable-next-line
  const formSchema = Yup.object({
    place: Yup.string()
      .required(
        l("settings.tab1.form.place.validation.required") ||
          "Place is required!"
      )
      .min(
        4,
        l("settings.tab1.form.place.validation.length") ||
          "Place must be at least 2 characters!"
      ),
    address: Yup.string()
      .required(
        l("settings.tab1.form.address.validation.required") ||
          "Address is required!"
      )
      .min(
        4,
        l("settings.tab1.form.address.validation.length") ||
          "Address must be at least 4 characters!"
      ),
    zipCode: Yup.string()
      .required(
        l("register.step1.form.zipCode.validation.required") ||
          "Zip code is required!"
      )
      .min(
        4,
        l("settings.tab1.form.zipCode.validation.length") ||
          "Zip code must be at least 4 characters!"
      ),
    country: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Country is required!"
    ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      location: "",
      address: "",
      zipCode: "",
      country: "",
    },
    //-----onSubmit-------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/basic`, //post request
        //   {
        //     verifyURL: `${window.location.origin}/register/step2`,
        //     title: values.title,
        //     address: values.address,
        //     longDescription: values.longDescription,
        //   }
        // );
        // console.log(response)
        router.push("/create-trial/step3");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            setError(error.response.data);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    },
    // validationSchema: formSchema,
  });

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className=" text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6 xl:w-3/4">
        <InputField
          label={l("register.step1.form.location.label") || "Location"}
          name="location"
          type="text"
          placeholder={
            l("register.step1.form.location.placeholder") ||
            "e.g. Copenhagen University"
          }
          formik={formik}
        />
        <InputField
          label={l("register.step1.form.address.label") || "Address"}
          name="address"
          type="text"
          placeholder={
            l("register.step1.form.address.placeholder") || "e.g. Street 1"
          }
          formik={formik}
        />
        <InputField
          label={l("register.step1.form.email.label") || "Zip code"}
          name="zipCode"
          type="text"
          placeholder={l("register.step1.form.email.placeholder") || "Zip code"}
          formik={formik}
        />
        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2">
            {l("register.step3.form.country.label") || "Country"}
            <span className="ml-1">*</span>
          </label>
          <CountryDropdown
            country={country}
            setCountry={setCountry}
            borderColor="#dff2df"
          />
          <small className="text-red-600">
            {formik.touched.country && formik.errors.country}
          </small>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep2Form;
