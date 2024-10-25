"use client";

import { useState } from "react";
import { useFormik, FormikErrors } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import axios from "axios";
import CountryDropdown from "./CountryDropdown";
import { AxiosError } from "axios";
import {
  CreateTrialStep2FormProps,
  CreateTrialStep2FormValues,
  SiteFormValues,
} from "@/types/index";
import useLanguageStore from "@/stores/language-store";

//--------- Reusable Input Component ---------
const InputField: React.FC<
  CreateTrialStep2FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialStep2FormValues>>;
    siteIndex: number;
  }
> = ({ label, name, type, placeholder, formik, icon, siteIndex }) => (
  <div className="flex flex-col">
    <label htmlFor={`${name}-${siteIndex}`}>
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
        id={`${name}-${siteIndex}`}
        name={`sites[${siteIndex}].${name}`}
        type={type}
        placeholder={placeholder}
        value={formik.values.sites[siteIndex][name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2 custom-border"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {
        (formik.errors.sites as FormikErrors<SiteFormValues>[] | undefined)?.[
          siteIndex
        ]?.[name]
      }
    </small>
  </div>
);

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep2Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    sites: Yup.array()
      .of(
        Yup.object({
          location: Yup.string().required(
            l("settings.tab1.form.place.validation.required") ||
              "Place is required!"
          ),
          address: Yup.string().required(
            l("settings.tab1.form.address.validation.required") ||
              "Address is required!"
          ),
          zipCode: Yup.string().required(
            l("register.step1.form.zipCode.validation.required") ||
              "Zip code is required!"
          ),
          country: Yup.string().required(
            l("register.step1.form.country.validation.required") ||
              "Country is required!"
          ),
        })
      )
      .required(),
  });

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep2FormValues>({
    initialValues: {
      sites: [
        {
          location: "",
          address: "",
          zipCode: "",
          country: "Denmark",
        },
      ],
    },
    validationSchema: formSchema,
    //---------onSubmit--------------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      const trialId = 1;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step2`, 
          {
          },          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response in step2:", response)
        router.push("/create-trial/step3");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
        }
      }
    },
  });

  //------------------Add another location----------------
  const addSite = () => {
    formik.setFieldValue(
      "sites",
      [
        ...formik.values.sites,
        {
          location: "",
          address: "",
          zipCode: "",
          country: "Denmark",
        },
      ],
      false
    );
  };

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      {formik.values.sites.map((_, index) => (
        <div
          key={index}
          className={`flex flex-col gap-6 xl:w-1/2 ${
            index > 0 ? "border-t-2 border-gray-300 pt-12 " : ""
          }`}
        >
          <InputField
            label={l("register.step1.form.location.label") || "Location"}
            name="location"
            type="text"
            placeholder={
              l("register.step1.form.location.placeholder") ||
              "e.g. Copenhagen University"
            }
            formik={formik}
            siteIndex={index}
          />
          <InputField
            label={l("register.step1.form.address.label") || "Address"}
            name="address"
            type="text"
            placeholder={
              l("register.step1.form.address.placeholder") || "e.g. Street 1"
            }
            formik={formik}
            siteIndex={index}
          />
          <InputField
            label={l("register.step1.form.zipCode.label") || "Zip code"}
            name="zipCode"
            type="text"
            placeholder={
              l("register.step1.form.zipCode.placeholder") || "Zip code"
            }
            formik={formik}
            siteIndex={index}
          />
          <div className="flex flex-col">
            <label htmlFor={`country-${index}`} className="mb-2">
              {l("register.step3.form.country.label") || "Country"}
              <span className="ml-1">*</span>
            </label>
            <CountryDropdown
              country={formik.values.sites[index].country}
              setCountry={(value) =>
                formik.setFieldValue(`sites[${index}].country`, value)
              }
              borderColor="#dff2df"
            />
            <small className="text-red-600">
              {formik.touched.sites?.[index]?.country &&
                (
                  formik.errors.sites as
                    | FormikErrors<SiteFormValues>[]
                    | undefined
                )?.[index]?.country}
            </small>
          </div>
        </div>
      ))}

      <div className="flex justify-center xs:justify-start gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "+ Add another site"}
          containerStyles="rounded-lg bg-secondary-50 hover1"
          handleClick={addSite}
        />
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1 mt-4"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep2Form;
