"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import DiseaseDropdown from "./DiseaseDropdown";
import { CreateTrialStep4FormProps } from "@/types/index";
import { AxiosError } from "axios";
import useLanguageStore from "@/stores/language-store";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep4Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({});

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep4FormProps>({
    initialValues: {
      shortDescription: "",
      inclusionDisease: [],
      exclusionDisease: [],
      participantActivities: "",
    },
    validationSchema: formSchema,
    //---------onSubmit--------------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(
        //   ${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/basic, //post request
        //   {
        //     verifyURL: ${window.location.origin}/register/step2,
        //     title: values.title,
        //     address: values.address,
        //     longDescription: values.longDescription,
        //   }
        // );
        // console.log(response)
        router.push("/trials");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
        }
      }
    },
  });

  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6 xl:w-2/3 2xl:w-1/2">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="shortDescription" className="text-sm font-semibold">
            Short Description:<span className="ml-1">*</span>
          </label>
          <input
            name="gggg"
            type="text"
            value={formik.values.shortDescription}
            onChange={(value) =>
              formik.setFieldValue("shortDescription", value)
            }
            className="register_input mt-2 custom-border"
          />
          <small className="text-red-600">
            {formik.touched.shortDescription && formik.errors.shortDescription}
          </small>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="inclusionDisease" className="text-sm font-semibold">
            Inclusion Disease:
          </label>
          <DiseaseDropdown
            value={formik.values.inclusionDisease}
            onChange={(value) =>
              formik.setFieldValue("inclusionDisease", value)
            }
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="exclusionDisease" className="text-sm font-semibold">
            Exclusion Disease:
          </label>
          <DiseaseDropdown
            value={formik.values.exclusionDisease}
            onChange={(value) =>
              formik.setFieldValue("exclusionDisease", value)
            }
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="participantActivities" className="text-sm font-semibold">
            Description of participant activities:
          </label>
          <ReactQuill
            value={formik.values.participantActivities}
            onChange={(value) => formik.setFieldValue("participantActivities", value)}
          />
        </div>



       
            <fieldset className="flex flex-col w-full">
              <legend className="text-sm font-semibold mb-2">Compensation:</legend>
              <div className="flex flex-col justify-between xl:flex-row">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                    Driving compensation
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                    Monetary compensation
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                    Other compensation
                    </label>
                  </div>
                </div>
              </div>
              </fieldset>






      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Create"}
          containerStyles="rounded-lg gradient-green1 hover1 mt-4"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep4Form;
