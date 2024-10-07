import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import CountryDropdown from "./CountryDropdown";
import axios, { AxiosError } from "axios";
import useLanguageStore from "@/stores/language-store";



//-------------------------------------- main function-----------------------------------------
const CreateTrialStep3Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [country, setCountry] = useState("Denmark");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    startDate: Yup.string()
      .required(
        l("settings.tab1.form.place.validation.required") ||
          "Place is required!"
      )
      .min(
        4,
        l("settings.tab1.form.place.validation.length") ||
          "Place must be at least 2 characters!"
      ),
    endDate: Yup.string()
      .required(
        l("settings.tab1.form.address.validation.required") ||
          "Address is required!"
      )
      .min(
        4,
        l("settings.tab1.form.address.validation.length") ||
          "Address must be at least 4 characters!"
      ),
    deadline: Yup.string()
      .required(
        l("register.step1.form.zipCode.validation.required") ||
          "Zip code is required!"
      )
      .min(
        4,
        l("settings.tab1.form.zipCode.validation.length") ||
          "Zip code must be at least 4 characters!"
      ),
    ageStart: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Country is required!"
    ),
    ageEnd: Yup.string().required(
        l("register.step1.form.country.validation.required") ||
          "Country is required!"
      ),
      gender: Yup.string().required(
        l("register.step1.form.country.validation.required") ||
          "Country is required!"
      ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      deadline: "",
      ageStart: "",
      ageEnd: "",
      gender: "",
    },
    //-----onSubmit-------
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




      <div className="flex flex-col gap-2 w-full sm:w-1/2">
        <label htmlFor="startDate">
          {l("register.step3.form.startDate.label") || "Start Date"}
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



      <div className="flex flex-col gap-2 w-full sm:w-1/2">
        <label htmlFor="endDate">
          {l("register.step3.form.endDate.label") || "End Date"}
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



      <div className="flex flex-col">
        <label htmlFor="country" className="mb-2">
          {l("register.step3.form.country.label") || "Country"}
          <span className="ml-1">*</span>
        </label>
        <CountryDropdown
          country={country}
          setCountry={setCountry}
          borderColor="black"
        />
        <small className="text-red-600">
          {formik.touched.country && formik.errors.country}
        </small>
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

export default CreateTrialStep3Form;
