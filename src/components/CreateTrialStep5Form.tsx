"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { CreateTrialStep5FormProps } from "@/types/index";
import { AxiosError } from "axios";
import useLanguageStore from "@/stores/language-store";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep5Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    expectedParticipants: Yup.number()
      .required(
        l("register.step3.form.country.validation.required") ||
          "Expected number of participants is required!"
      )
      .min(1, "Expected number of participants must be greater than zero!"),
  });

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep5FormProps>({
    initialValues: {
      participantActivities: "",
      expectedParticipants: null,
      additionalInfo: "",
      drivingCompensation: false,
      monetaryCompensation: false,
      otherCompensation: "",
    },
    validationSchema: formSchema,
    //---------onSubmit--------------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(
        //   ${process.env.NEXT_PUBLIC_API_URL}/v1/.........., //post request
        //   {
        //     participantActivities: values.participantActivities,
        //     inclusionDisease: values.inclusionDisease,
        //     inclusionRequirements: values.inclusionRequirements,
        //     exclusionDisease: values.exclusionDisease,
        //     exclusionRequirements: values.exclusionRequirements,
        //     expectedParticipants: values.expectedParticipants,
        //     additionalInfo: values.additionalInfo,
        //     drivingCompensation: values.drivingCompensation,
        //     monetaryCompensation: values.monetaryCompensation,
        //     otherCompensation: values.otherCompensation,
        //   }
        // );
        // console.log(response)
        router.push("/create-trial/step6");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
        }
      }
    },
  });

  //--------toggle textarea---------
  const [isOtherClicked, setIsOtherClicked] = useState(false);
  const toggleOtherCompensation = () => {
    setIsOtherClicked(!isOtherClicked);
  };

  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6 2xl:w-2/3">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="participantActivities"
            className="text-sm font-semibold"
          >
            Describe participant activities:
          </label>
          <ReactQuill
            value={formik.values.participantActivities}
            onChange={(value) =>
              formik.setFieldValue("participantActivities", value)
            }
            placeholder="Outline participant activities"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="expectedParticipants"
              className="text-sm font-semibold"
            >
              Expected number of participants:<span className="ml-1">*</span>
            </label>
            <input
              name="expectedParticipants"
              type="number"
              value={
                formik.values.expectedParticipants !== null
                  ? formik.values.expectedParticipants
                  : ""
              }
              onChange={(e) =>
                formik.setFieldValue(
                  "expectedParticipants",
                  Number(e.target.value)
                )
              }
              onBlur={formik.handleBlur("expectedParticipants")}
              placeholder="Enter the expected number of participants"
              className="register_input custom-border"
            />
            <small className="text-red-600">
              {formik.touched.expectedParticipants &&
                formik.errors.expectedParticipants}
            </small>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="additionalInfo" className="text-sm font-semibold">
              Additional Information:
            </label>
            <input
              name="additionalInfo"
              type="text"
              value={formik.values.additionalInfo}
              onChange={(value) =>
                formik.setFieldValue("additionalInfo", value)
              }
              placeholder="Briefly describe additional information"
              className="register_input custom-border"
            />
          </div>
        </div>

        <fieldset className="flex flex-col w-full">
          <legend className="text-sm font-semibold mb-2">Compensation:</legend>
          <div className="flex flex-col justify-between xl:flex-row">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="drivingCompensation"
                  name="drivingCompensation"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={() =>
                    formik.setFieldValue(
                      "drivingCompensation",
                      !formik.values.drivingCompensation
                    )
                  }
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="drivingCompensation"
                  className="font-medium text-gray-900"
                >
                  Driving compensation
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="monetaryCompensation"
                  name="monetaryCompensation"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={() =>
                    formik.setFieldValue(
                      "monetaryCompensation",
                      !formik.values.monetaryCompensation
                    )
                  }
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="monetaryCompensation"
                  className="font-medium text-gray-900"
                >
                  Monetary compensation
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="otherCompensation"
                  name="otherCompensation"
                  type="checkbox"
                  onClick={toggleOtherCompensation}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="otherCompensation"
                  className="font-medium text-gray-900"
                >
                  Other compensation
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div hidden={!isOtherClicked}>
          <div className="flex flex-col justify-start gap-2 mb-12">
            <p className="text-sm font-semibold mb-2">
              {l("register.step4.other.description") ||
                "Inform other compensation:"}
            </p>
            <textarea
              value={formik.values.otherCompensation}
              onChange={(e) =>
                formik.setFieldValue("otherCompensation", e.target.value)
              }
              className="h-24 p-3 border border-[#dff2df] rounded-lg"
              placeholder="Please inform other compensation"
            ></textarea>
          </div>
        </div>
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

export default CreateTrialStep5Form;
