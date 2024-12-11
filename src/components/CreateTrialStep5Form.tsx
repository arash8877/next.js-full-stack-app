"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import TooltipButton from "./Tooltip";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { CreateTrialStep5FormProps } from "@/types/index";
import axios, { AxiosError } from "axios";
import useCreateTrialStore from "@/stores/createTrial-store";
import PublishDropdown from "./PublishDropdown";
import RecruitingDropdown from "./RecruitingDropdown";
import useLanguageStore from "@/stores/language-store";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep5Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { formData, setFormData } = useCreateTrialStore();
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    expectedParticipants: Yup.number()
      .required(
        l("register.step3.form.country.validation.required") ||
          "Expected number of participants is required!"
      )
      .integer("Expected number of participants must be an integer")
      .min(1, "Expected number of participants must be greater than zero!"),
    recruiting: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Recruiting status is required!"
    ),

    publish: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Publish status is required!"
    ),
  });

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep5FormProps>({
    initialValues: {
      participantActivities: formData.step5Data?.participantActivities || "",
      expectedParticipants: formData.step5Data?.expectedParticipants || "",
      additionalInformation: formData.step5Data.additionalInformation || "",
      recruiting: formData.step5Data?.recruiting || "",
      publish: formData.step5Data?.publish || "",
      drivingCompensation: formData.step5Data?.drivingCompensation || false,
      monetaryCompensation: formData.step5Data?.monetaryCompensation || false,
      otherCompensation: formData.step5Data?.otherCompensation || false,
      otherCompensationText: formData.step5Data?.otherCompensationText || "",
    },
    validationSchema: formSchema,
    //---------onSubmit--------------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      const trialId = localStorage.getItem("currentTrialEditId");
      const payload = {
        participantActivities: values["participantActivities"],
        expectedParticipants: values["expectedParticipants"],
        additionalInformation: values["additionalInformation"],
        recruiter: values["recruiting"],
        publish: values["publish"],
        drivingCompensation: values["drivingCompensation"] ?? false,
        monetaryCompensation: values["monetaryCompensation"] ?? false,
        otherCompensation: values["otherCompensation"] ?? false,
        otherCompensationText: values["otherCompensationText"] || "",
      };
      try {
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step5`, //request
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          ...formData,
          step5Data: {
            ...formData.step5Data,
            participantActivities: values.participantActivities || "",
            expectedParticipants: values.expectedParticipants,
            additionalInformation: values.additionalInformation || "",
            drivingCompensation: values.drivingCompensation,
            recruiting: values.recruiting || "",
            publish: values.publish || "",
            monetaryCompensation: values.monetaryCompensation,
            otherCompensation: values.otherCompensation,
            otherCompensationText: values.otherCompensationText || "",
          },
        });
        document.cookie =
          "createTrialStep5Completed=true; Path=/; max-age=7200";
        router.push("/create-trial/step6");
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
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
            Describe participant activities
          </label>
          <div className="h-[200px] mb-16">
            <ReactQuill
              value={formik.values.participantActivities}
              onChange={(value) =>
                formik.setFieldValue("participantActivities", value)
              }
              className="h-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="expectedParticipants"
              className="text-sm font-semibold"
            >
              Expected number of participants<span className="ml-1">*</span>
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
              Additional Information
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="recruiting" className="text-sm font-semibold">
              Recruiting status:<span className="ml-1">*</span>
            </label>
            <RecruitingDropdown
              status={formik.values.recruiting || ""}
              setStatus={(value) => formik.setFieldValue("recruiting", value)}
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.recruiting && formik.errors.recruiting}
            </small>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="publish" className="text-sm font-semibold">
              Publish status:<span className="ml-1">*</span>{" "}
              <span>
                <TooltipButton
                  title={
                    "If you select 'Publish', the trial will be published immediately after approval"
                  }
                  iconSrc="/tooltip.svg"
                />
              </span>
            </label>
            <PublishDropdown
              status={formik.values.publish || ""}
              setStatus={(value) => formik.setFieldValue("publish", value)}
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.publish && formik.errors.publish}
            </small>
          </div>
        </div>

        <fieldset className="flex flex-col w-full">
          <legend className="text-sm font-semibold mb-2">Compensation</legend>
          <div className="flex flex-col justify-between xl:flex-row">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="drivingCompensation"
                  name="drivingCompensation"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={formik.values.drivingCompensation}
                  onChange={() => {
                    const updatedValue = !formik.values.drivingCompensation;
                    formik.setFieldValue("drivingCompensation", updatedValue);
                    setFormData({
                      ...formData,
                      step5Data: {
                        ...formData.step5Data,
                        drivingCompensation: updatedValue,
                      },
                    });
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
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={formik.values.monetaryCompensation}
                  onChange={() => {
                    const updatedValue = !formik.values.monetaryCompensation;
                    formik.setFieldValue("monetaryCompensation", updatedValue);
                    setFormData({
                      ...formData,
                      step5Data: {
                        ...formData.step5Data,
                        monetaryCompensation: updatedValue,
                      },
                    });
                  }}
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
                  checked={formik.values.otherCompensation}
                  onChange={() => {
                    const updatedValue = !formik.values.otherCompensation;
                    formik.setFieldValue("otherCompensation", updatedValue);
                    setFormData({
                      ...formData,
                      step5Data: {
                        ...formData.step5Data,
                        otherCompensation: updatedValue,
                      },
                    });
                  }}
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

        <div hidden={!formik.values.otherCompensation}>
          <div className="flex flex-col justify-start gap-2 mb-12">
            <p className="text-sm font-semibold mb-2">
              {l("register.step4.other.description") ||
                "Inform other compensation"}
            </p>
            <textarea
              value={formik.values.otherCompensationText}
              onChange={(e) => {
                const updatedValue = e.target.value;
                formik.setFieldValue("otherCompensationText", updatedValue);
                setFormData({
                  ...formData,
                  step5Data: {
                    ...formData.step5Data,
                    otherCompensationText: e.target.value,
                  },
                });
              }}
              className="h-24 p-3 border border-[#dff2df] rounded-lg"
              placeholder="Please inform other compensation"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1 mt-4"
          // disabledContainerStyles="rounded-lg bg-gray-300"
          // disabled={!formik.isValid || !formik.dirty}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep5Form;
