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

      <div className="flex flex-col gap-6 xl:w-1/2">
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
