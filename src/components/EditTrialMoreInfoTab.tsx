"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateTrialStep5FormProps } from "@/types";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
// import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

//----------------------------------- Main function -----------------------------------
export default function EditTrialMoreInfoTab({
  trialId,
  participantActivities,
  expectedParticipants,
  additionalInformation,
  drivingCompensation,
  monetaryCompensation,
  otherCompensation,
  otherCompensationText,
}: CreateTrialStep5FormProps) {
  const { l } = useLanguageStore();

  //----Yup validation ---------
  const formSchema = Yup.object({
    expectedParticipants: Yup.number()
      .required(
        l("register.step3.form.country.validation.required") ||
          "Expected number of participants is required!"
      )
      .integer("Expected number of participants must be an integer")
      .min(1, "Expected number of participants must be greater than zero!"),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    validationSchema: formSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: {
      participantActivities: participantActivities || "",
      expectedParticipants: expectedParticipants || 0,
      additionalInformation: additionalInformation || "",
      drivingCompensation: drivingCompensation || false,
      monetaryCompensation: monetaryCompensation || false,
      otherCompensation: otherCompensation || false,
      otherCompensationText: otherCompensationText || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      // eslint-disable-next-line
      const payload = {
        trialId: trialId,
        participantActivities: values.participantActivities,
        expectedParticipants: values.expectedParticipants,
        additionalInformation: values.additionalInformation,
        drivingCompensation: values.drivingCompensation,
        monetaryCompensation: values.monetaryCompensation,
        otherCompensation: values.otherCompensation,
        otherCompensationText: values.otherCompensationText,
      };
      const token = localStorage.getItem("token");
      try {
      // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step5`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("The trial is updated successfully", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      }
    },
  });

  //-------- toggle textarea ---------
  const [isOtherClicked, setIsOtherClicked] = useState(false);
  const toggleOtherCompensation = () => {
    setIsOtherClicked(!isOtherClicked);
  };

  function ChangeAdditionalInfoValue() {
    const inputElement = document.getElementById(
      "additionalInfo_txt"
    ) as HTMLInputElement | null;
    const inputValue = inputElement?.value || "";
    formik.setFieldValue("additionalInformation", inputValue);
  }

  //-------- Quill ---------
  // const modules = {
  //   toolbar: [
  //     [{ header: "2" }, { header: "3" }],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     [{ align: [] }],
  //     ["bold", "italic", "underline"],
  //     ["link"],
  //   ],
  // };

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 md:mt-12  bg-white rounded-lg">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6 2xl:w-2/3">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="participantActivities"
              className="text-sm font-semibold"
            >
              Describe participant activities:
            </label>
            <div className="h-[200px] mb-16">
              <ReactQuill
                value={formik.values.participantActivities}
                onChange={(value) =>
                  formik.setFieldValue("participantActivities", value)
                }
                placeholder="Outline participant activities"
                className="h-full"
              />
              <small className="text-red-600">
                {formik.touched.participantActivities &&
                  formik.errors.participantActivities}
              </small>
            </div>
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
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="additionalInformation"
                className="text-sm font-semibold"
              >
                Additional Information:
              </label>
              <input
                id="additionalInfo_txt"
                name="additionalInformation"
                type="text"
                value={formik.values.additionalInformation}
                onChange={() => ChangeAdditionalInfoValue()}
                placeholder="Briefly describe additional information"
                className="register_input custom-border"
              />
            </div>
          </div>

          <fieldset className="flex flex-col w-full">
            <legend className="text-sm font-semibold mb-2">
              Compensation:
            </legend>
            <div className="flex flex-col justify-between xl:flex-row">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="drivingCompensation"
                    name="drivingCompensation"
                    type="checkbox"
                    checked={formik.values.drivingCompensation}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => {
                      const updatedValue = !formik.values.drivingCompensation;
                      formik.setFieldValue("drivingCompensation", updatedValue);
                    }}
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
                    checked={formik.values.monetaryCompensation}
                    onChange={() => {
                      const updatedValue = !formik.values.monetaryCompensation;
                      formik.setFieldValue(
                        "monetaryCompensation",
                        updatedValue
                      );
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                    checked={formik.values.otherCompensation}
                    onChange={() => {
                      const updatedValue = !formik.values.otherCompensation;
                      formik.setFieldValue("otherCompensation", updatedValue);
                    }}
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
                value={formik.values.otherCompensationText}
                onChange={(e) => {
                  const updatedValue = e.target.value;
                  formik.setFieldValue("otherCompensationText", updatedValue);
                }}
                className="h-24 p-3 border border-[#dff2df] rounded-lg"
                placeholder="Please inform other compensation"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center xs:justify-end gap-4 mt-8">
          <CustomButton
            title={l("settings.form.submit") || "Update"}
            containerStyles="rounded-lg gradient-green1 hover1"
            btnType="submit"
          />
        </div>
      </form>
    </section>
  );
}
