"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { iTrialInfoProps } from "@/types";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import CountryDropdown from "./CountryDropdown";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";

//----------------------------------- Main function -----------------------------------
export default function EditTrialSiteTab({
  trialId,
  trialSites,
}: iTrialInfoProps) {
  const { l } = useLanguageStore();

  useEffect(() => {
    console.log("Sites", trialSites);
  }, [trialSites]);

  //---- Validation Schema ---------
  const formSchema = Yup.object({
    trialSites: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required(
            l("settings.tab1.form.name.validation.required") ||
              "name is required!"
          ),
          address: Yup.string().required(
            l("settings.tab1.form.address.validation.required") ||
              "Address is required!"
          ),
          zipCode: Yup.string().required(
            l("settings.tab1.form.zipCode.validation.required") ||
              "ZIP Code is required!"
          ),
          country: Yup.string().required(
            l("settings.tab1.form.country.validation.required") ||
              "Country is required!"
          ),
        })
      )
      .min(
        1,
        l("settings.tab1.form.validation.minSites") ||
          "At least one site is required!"
      ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    validationSchema: formSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: {
      trialSites: trialSites || [
        { name: "", address: "", zipCode: "", country: "" },
      ],
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      console.log("Submit", values);
      const token = localStorage.getItem("token");
      console.log("values:", values);
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step2`,
          {
            trialSites: values.trialSites,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response:", response);
        toast.success(
          l("settings.form.success") || "Trial updated successfully!"
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          toast.error(l("settings.form.error") || "Something went wrong!");
        }
      }
    },
  });

  // --------- remove a site  -----------
  const removeSite = (index: number) => {
    const updatedSites = [...formik.values.trialSites];
    updatedSites.splice(index, 1);
    formik.setFieldValue("trialSites", updatedSites);
  };

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 md:mt-12  bg-bgColor-200 rounded-lg p-4 xl:p-12">
      <form onSubmit={formik.handleSubmit}>
        {formik.values.trialSites.map((site, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-4 w-full  border-b pb-4 mb-12"
            >
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <label
                    htmlFor={`trialSites.${index}.name`}
                    className="text-sm font-semibold"
                  >
                    {l("settings.tab4.form.password.label") || "Location:"}
                    <span className="ml-1">*</span>
                  </label>
                  <input
                    name={`trialSites.${index}.name`}
                    type="text"
                    value={formik.values.trialSites[index].name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="register_input custom-border"
                  />
                  <small className="text-red-600">
                    {formik.touched.trialSites?.[index]?.name &&
                      typeof formik.errors.trialSites?.[index] === "object" &&
                      formik.errors.trialSites?.[index]?.name}
                  </small>
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <label
                    htmlFor={`trialSites.${index}.address`}
                    className="text-sm font-semibold"
                  >
                    {l("settings.tab4.form.password.label") || "Address:"}
                    <span className="ml-1">*</span>
                  </label>
                  <input
                    name={`trialSites.${index}.address`}
                    type="text"
                    value={formik.values.trialSites[index].address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="register_input custom-border"
                  />
                  <small className="text-red-600">
                    {formik.touched.trialSites?.[index]?.address &&
                      typeof formik.errors.trialSites?.[index] === "object" &&
                      formik.errors.trialSites?.[index]?.address}
                  </small>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <label
                    htmlFor={`trialSites.${index}.zipCode`}
                    className="text-sm font-semibold"
                  >
                    {l("settings.tab4.form.password.label") || "Zip Code:"}
                    <span className="ml-1">*</span>
                  </label>
                  <input
                    name={`trialSites.${index}.zipCode`}
                    type="text"
                    value={formik.values.trialSites[index].zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="register_input custom-border"
                  />
                  <small className="text-red-600">
                    {formik.touched.trialSites?.[index]?.zipCode &&
                      typeof formik.errors.trialSites?.[index] === "object" &&
                      formik.errors.trialSites?.[index]?.zipCode}
                  </small>
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <label
                    htmlFor={`trialSites.${index}.country`}
                    className="text-sm font-semibold"
                  >
                    {l("settings.tab1.form.country.label") || "Country:"}
                    <span className="ml-1">*</span>
                  </label>
                  <CountryDropdown
                    country={formik.values.trialSites[index].country}
                    setCountry={(value) =>
                      formik.setFieldValue(`trialSites.${index}.country`, value)
                    }
                    borderColor="#DFF2DF"
                  />
                  <small className="text-red-600">
                    {formik.touched.trialSites?.[index]?.country &&
                      typeof formik.errors.trialSites?.[index] === "object" &&
                      formik.errors.trialSites?.[index]?.country}
                  </small>
                </div>
              </div>

              {index > 0 && (
                <div className="flex justify-center gap-4 mt-8">
                  <CustomButton
                  title={l("settings.form.submit") || "Remove Site"}
                    containerStyles="rounded-lg h-[48px] bg-bgColor-red hover1"
                    textStyles="text-white"
                    btnType="button"
                    handleClick={() => removeSite(index)}
                  />
                </div>

                // <button
                //   type="button"
                //   onClick={() => removeSite(index)}
                //   className="text-red-600 text-sm underline"
                // >
                //   {l("settings.tab4.form.removeSite") || "Remove Site"}
                // </button>
              )}
            </div>
          );
        })}

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
