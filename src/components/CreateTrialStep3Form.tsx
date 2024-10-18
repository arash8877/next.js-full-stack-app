"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import GenderDropdown from "./GenderDropdown";
import { AxiosError } from "axios";
import useLanguageStore from "@/stores/language-store";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep3Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  // eslint-disable-next-line
  const formSchema = Yup.object({
    startDate: Yup.string().required(
      l("settings.tab1.form.place.validation.required") ||
        "Start date is required!"
    ),
    endDate: Yup.string().required(
      l("settings.tab1.form.address.validation.required") ||
        "End date is required!"
    ),
    deadline: Yup.string().required(
      l("register.step1.form.zipCode.validation.required") ||
        "Deadline is required!"
    ),
    ageMin: Yup.string().required(
      l("register.step1.form.country.validation.required") || "Age is required!"
    ),
    ageMax: Yup.string().required(
      l("register.step1.form.country.validation.required") || "Age is required!"
    ),
    gender: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Gender is required!"
    ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      deadline: "",
      ageMin: "",
      ageMax: "",
      gender: "",
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
        router.push("/trials");
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
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="startDate">
              {l("register.step3.form.startDate.label") || "Start Study Date"}
              <span className="ml-1">*</span>
            </label>
            <CustomDateInput
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              onBlur={formik.handleBlur("startDate")}
            />
            <small className="text-red-600">
              {formik.touched.startDate && formik.errors.startDate}
            </small>
          </div>

          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="endDate">
              {l("register.step3.form.endDate.label") || "End Study Date"}
              <span className="ml-1">*</span>
            </label>
            <CustomDateInput
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue("endDate", date)}
              onBlur={formik.handleBlur("endDate")}
            />
            <small className="text-red-600">
              {formik.touched.endDate && formik.errors.endDate}
            </small>
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="deadline">
              {l("register.step3.form.deadline.label") || "Enrolment Deadline"}
              <span className="ml-1">*</span>
            </label>
            <CustomDateInput
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue("deadline", date)}
              onBlur={formik.handleBlur("deadline")}
            />
            <small className="text-red-600">
              {formik.touched.deadline && formik.errors.deadline}
            </small>
          </div>

          <div className="flex flex-col xl:w-1/2">
            <label htmlFor="gender" className="mb-2">
              {l("register.step3.form.gender.label") || "Biological sex"}
              <span className="ml-1">*</span>
            </label>
            <GenderDropdown
              gender={formik.values.gender}
              setGender={(value) => formik.setFieldValue("gender", value)}
              borderColor="black"
            />
            <small className="text-red-600">
              {formik.touched.gender && formik.errors.gender}
            </small>
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="ageMin">
              {l("register.step3.form.ageMin.label") || "Min. Age"}
              <span className="ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder={
                l("register.step3.form.ageMin.placeholder") || "e.g. 18 years"
              }
              value={formik.values.ageMin}
              onChange={formik.handleChange("ageMin")}
              onBlur={formik.handleBlur("ageMin")}
              className="register_input focus:border-blue-500"
            />
            <small className="text-red-600">
              {formik.touched.ageMin && formik.errors.ageMin}
            </small>
          </div>

          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="ageMax">
              {l("register.step3.form.ageMax.label") || "Max. Age"}
              <span className="ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder={
                l("register.step3.form.ageMax.placeholder") || "e.g. 90 years"
              }
              value={formik.values.ageMin}
              onChange={formik.handleChange("ageMax")}
              onBlur={formik.handleBlur("ageMax")}
              className="register_input focus:border-blue-500"
            />
            <small className="text-red-600">
              {formik.touched.ageMax && formik.errors.ageMax}
            </small>
          </div>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Create"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep3Form;
