"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import GenderDropdown from "./GenderDropdown";
import axios from "axios";
import useCreateTrialStore from "@/stores/createTrial-store";
import Spinner from "./Spinner";
import useLanguageStore from "@/stores/language-store";
import AgeDropdown from "./AgeDropdown";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep3Form = () => {
  const router = useRouter();
  const { formData, setFormData } = useCreateTrialStore();
  const [loading, setLoading] = useState(false);
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    startDate: Yup.date().required(
      l("settings.tab1.form.place.validation.required") ||
        "Start date is required!"
    ),
    endDate: Yup.date()
      .required(
        l("settings.tab1.form.address.validation.required") ||
          "End date is required!"
      )
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    deadline: Yup.date()
      .required(
        l("register.step1.form.zipCode.validation.required") ||
          "Deadline is required!"
      )
      .max(
        Yup.ref("endDate"),
        "Deadline should not be later than End Study Date"
      ),
    ageMax: Yup.number()
      .min(
        Yup.ref("ageMin"),
        "Maximum age should be greater than or equal to minimum age"
      )
      .integer("Maximum age must be an integer")
      .max(120, "Maximum age should be less than or equal to 120 years"),
    ageMin: Yup.number()
      .typeError("Minimum age must be a valid number")
      .required(
        l("register.step1.form.country.validation.required") ||
          "Minimum age is required!"
      )
      .integer("Minimum age must be an integer")
      .min(18, "Minimum age should be 18 years or older")
      .max(119, "Minimum age should be less than 120 years"),

    gender: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Gender is required!"
    ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      startDate: formData.step3Data.startDate || "",
      endDate: formData.step3Data.endDate || "",
      deadline: formData.step3Data.deadline || "",
      ageMin: formData.step3Data.ageMin || "",
      ageMax: formData.step3Data.ageMax || "",
      gender: formData.step3Data.gender || "",
    },
    //-----onSubmit-------
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        startDate: values["startDate"],
        endDate: values["endDate"],
        submissionDeadline: values["deadline"],
        ageMin: values["ageMin"],
        ageMax: values["ageMax"],
        gender: values["gender"],
      };
      try {
        // eslint-disable-next-line
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("sp_token")
            : null;
        const trialId =
          typeof window !== "undefined"
            ? localStorage.getItem("currentTrialEditId")
            : null;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step3`, //PATCH request
          {
            payload,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Payload in create trial step 3", payload);
        console.log("RESPONSE in create trial- step3", response);
        setFormData({
          ...formData,
          step3Data: {
            ...formData.step3Data,
            startDate: values.startDate,
            endDate: values.endDate,
            deadline: values.deadline,
            ageMin: values.ageMin,
            ageMax: values.ageMax,
            gender: values.gender,
          },
        });
        document.cookie =
          "createTrialStep3Completed=true; Path=/; max-age=7200";
        router.push("/create-trial/step4");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: formSchema,
  });

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      {loading && <Spinner />}
      <div className="flex flex-col gap-2 sm:gap-6 xl:w-3/4">
        <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="startDate">
              {l("register.step3.form.startDate.label") || "Start Study Date"}
              <span className="ml-1">*</span>
            </label>
            <CustomDateInput
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              onBlur={formik.handleBlur("startDate")}
              borderColor="custom-border"
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
              borderColor="custom-border"
              minDate={
                formik.values.startDate
                  ? new Date(formik.values.startDate) // Set minDate to start date for end date
                  : undefined
              }
            />
            <small className="text-red-600">
              {formik.touched.endDate && formik.errors.endDate}
            </small>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="deadline">
              {l("register.step3.form.deadline.label") || "Enrolment Deadline"}
              <span className="ml-1">*</span>
            </label>
            <CustomDateInput
              value={formik.values.deadline}
              onChange={(date) => formik.setFieldValue("deadline", date)}
              onBlur={formik.handleBlur("deadline")}
              borderColor="custom-border"
              maxDate={
                formik.values.endDate
                  ? new Date(
                      new Date(formik.values.endDate).setDate(
                        new Date(formik.values.endDate).getDate() - 1
                      )
                    )
                  : undefined
              }
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
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.gender && formik.errors.gender}
            </small>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="ageMin">
              {l("register.step3.form.ageMin.label") || "Min. Age"}
              <span className="ml-1">*</span>
            </label>
            <AgeDropdown
              age={Number(formik.values.ageMin)}
              setAge={(value) => formik.setFieldValue("ageMin", value)}
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.ageMin && formik.errors.ageMin}
            </small>
          </div>

          <div className="flex flex-col gap-2 xl:w-1/2">
            <label htmlFor="ageMax">
              {l("register.step3.form.ageMax.label") || "Max. Age"}
            </label>
            <AgeDropdown
              age={Number(formik.values.ageMax)}
              setAge={(value) => formik.setFieldValue("ageMax", value)}
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.ageMax && formik.errors.ageMax}
            </small>
          </div>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          // disabledContainerStyles="rounded-lg bg-gray-300"
          // disabled={!formik.isValid || !formik.dirty}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep3Form;
