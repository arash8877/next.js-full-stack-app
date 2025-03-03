"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { iTrialInfoProps } from "@/types";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import CountryDropdown from "./CountryDropdown";
import { toast } from "react-toastify";
import SiteDropdown from "./SiteDropdown";
import useLanguageStore from "@/stores/language-store";

//----------------------------------- Main function -----------------------------------
export default function EditTrialSiteTab({ trialId, sites }: iTrialInfoProps) {
  const { l } = useLanguageStore();
  const [localSites, setLocalSites] = useState(sites || []);
  const [showSiteFields, setShowSiteFields] = useState(false);
  const isEnteredSites = true;

  console.log("sites in edit trial step 2:", sites);
  console.log("showSiteFields:", showSiteFields);

  useEffect(() => {
    setLocalSites(sites || []);
  }, [sites]);

  //---- Validation Schema ---------
  const formSchema = Yup.object({
    sites: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required(
            l("settings.tab1.form.name.validation.required") ||
              "Name is required!"
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
      sites: localSites,
    },
    onSubmit: async (values) => {
      const token = localStorage.getItem("sp_token");
      try {
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step2`,
          {
            sites: values.sites,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(
          l("settings.form.success") || "Trial updated successfully!"
        );
        setLocalSites(values.sites); // Update localSites after successful submission
        setTimeout(() => window.location.reload(), 2000);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          toast.error(l("settings.form.error") || "Something went wrong!");
        }
      }
    },
  });

  //------------------Add another site ----------------
  const addSite = () => {
    formik.setFieldValue(
      "sites",
      [
        ...formik.values.sites,
        {
          name: "",
          address: "",
          zipCode: "",
          country: "Denmark",
        },
      ],
      false
    );
  };

  // --------- remove a site  -----------
  const removeSite = (index: number) => {
    const updatedSites = [...formik.values.sites];
    updatedSites.splice(index, 1);
    formik.setFieldValue("sites", updatedSites);
  };

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 lg:mt-12  bg-white rounded-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-12 "
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="inclusionDisease" className="text-sm font-semibold">
            List of Sites
          </label>
          <SiteDropdown />
        </div>

        {(!showSiteFields || !isEnteredSites) && (
          <div className="flex justify-center lg:justify-start gap-4 xl:w-1/2">
            <CustomButton
              title="+ Add a site manually"
              containerStyles="custom-width3-btn rounded-lg bg-secondary-50 hover1"
              handleClick={() => {
                setShowSiteFields(true);
              }}
            />
          </div>
        )}

        {(showSiteFields || isEnteredSites) && (
          <>
            {formik.values.sites.map((site, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 w-full  border-b pb-4 mb-12"
                >
                  <div className="flex flex-col lg:w-3/4 2xl:w-1/2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`sites.${index}.name`}
                        className="text-sm font-semibold"
                      >
                        {l("settings.tab4.form.password.label") || "Location:"}
                        <span className="ml-1">*</span>
                      </label>
                      <input
                        name={`sites.${index}.name`}
                        type="text"
                        value={formik.values.sites[index].name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="register_input custom-border"
                      />
                      <small className="text-red-600">
                        {formik.touched.sites?.[index]?.name &&
                          typeof formik.errors.sites?.[index] === "object" &&
                          formik.errors.sites?.[index]?.name}
                      </small>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`sites.${index}.address`}
                        className="text-sm font-semibold"
                      >
                        {l("settings.tab4.form.password.label") || "Address:"}
                        <span className="ml-1">*</span>
                      </label>
                      <input
                        name={`sites.${index}.address`}
                        type="text"
                        value={formik.values.sites[index].address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="register_input custom-border"
                      />
                      <small className="text-red-600">
                        {formik.touched.sites?.[index]?.address &&
                          typeof formik.errors.sites?.[index] === "object" &&
                          formik.errors.sites?.[index]?.address}
                      </small>
                    </div>
                  </div>

                  <div className="flex flex-col lg:w-3/4 2xl:w-1/2 gap-4 ">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`sites.${index}.zipCode`}
                        className="text-sm font-semibold"
                      >
                        {l("settings.tab4.form.password.label") || "Zip Code:"}
                        <span className="ml-1">*</span>
                      </label>
                      <input
                        name={`sites.${index}.zipCode`}
                        type="text"
                        value={formik.values.sites[index].zipCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="register_input custom-border"
                      />
                      <small className="text-red-600">
                        {formik.touched.sites?.[index]?.zipCode &&
                          typeof formik.errors.sites?.[index] === "object" &&
                          formik.errors.sites?.[index]?.zipCode}
                      </small>
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <label
                        htmlFor={`sites.${index}.country`}
                        className="text-sm font-semibold"
                      >
                        {l("settings.tab1.form.country.label") || "Country:"}
                        <span className="ml-1">*</span>
                      </label>
                      <CountryDropdown
                        country={formik.values.sites[index].country}
                        setCountry={(value) =>
                          formik.setFieldValue(`sites.${index}.country`, value)
                        }
                        borderColor="#DFF2DF"
                      />
                      <small className="text-red-600">
                        {formik.touched.sites?.[index]?.country &&
                          typeof formik.errors.sites?.[index] === "object" &&
                          formik.errors.sites?.[index]?.country}
                      </small>
                    </div>
                  </div>

                  <div className="flex justify-center xs:justify-start gap-4">
                    <CustomButton
                      title={l("settings.form.submit") || "Remove Site"}
                    containerStyles="bg-bgColor-red rounded-lg"
                      textStyles="text-white"
                      btnType="button"
                      handleClick={() => removeSite(index)}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center lg:justify-start gap-4">
              <CustomButton
                title="+ Add another site"
                containerStyles="custom-width3-btn rounded-lg bg-secondary-50 hover1"
                handleClick={addSite}
              />
            </div>
          </>
        )}

        <div className="flex justify-center lg:justify-end gap-4">
          <CustomButton
            title={l("settings.form.submit") || "Update"}
            containerStyles="custom-width3-btn rounded-lg gradient-green1 hover1 mt-4"
            btnType="submit"
          />
        </div>
      </form>
    </section>
  );
}
