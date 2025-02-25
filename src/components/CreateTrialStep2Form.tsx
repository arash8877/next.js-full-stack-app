"use client";

import { useState } from "react";
import { useFormik, FormikErrors } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import axios from "axios";
import CountryDropdown from "./CountryDropdown";
import Spinner from "./Spinner";
import { AxiosError } from "axios";
import {
  CreateTrialStep2FormProps,
  CreateTrialStep2FormValues,
  SiteFormValues,
} from "@/types/index";
import useCreateTrialStore from "@/stores/createTrial-store";
import useLanguageStore from "@/stores/language-store";
import SiteDropdown from "./SiteDropdown";

//--------- Reusable Input Component ---------
const InputField: React.FC<
  CreateTrialStep2FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialStep2FormValues>>;
    siteIndex: number;
  }
> = ({ label, name, type, placeholder, formik, icon, siteIndex }) => (
  console.log("formik.values.sites[siteIndex][name]:", formik.values.sites[siteIndex][name]),
  (
    <div className="flex flex-col">
      <label htmlFor={`${name}-${siteIndex}`}>
        {label}
        <span className="ml-1">*</span>
      </label>
      <div className="relative">
        {icon && (
          <Image
            src={icon}
            width={20}
            height={16}
            alt={`${name}-icon`}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        )}
        <input
          id={`${name}-${siteIndex}`}
          name={`sites[${siteIndex}].${name}`}
          type={type}
          placeholder={placeholder}
          value={formik.values.sites[siteIndex][name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register_input mt-2 custom-border"
          style={icon ? { paddingLeft: "2.5rem" } : {}}
        />
      </div>
      <small className="text-red-600">
        {
          (formik.errors.sites as FormikErrors<SiteFormValues>[] | undefined)?.[
            siteIndex
          ]?.[name]
        }
      </small>
    </div>
  )
);

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep2Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { formData, setFormData } = useCreateTrialStore();
  const [loading, setLoading] = useState(false);
  const [showSiteFields, setShowSiteFields] = useState(false);
  const [selectedSites, setSelectedSites] = useState<SiteFormValues[]>([]);
  const { l } = useLanguageStore();

  console.log("formData in step 2:", formData.step2Data);
  console.log("selectedSites in step 2:", selectedSites);
  //----------------- Yup validation ---------------
  const formSchema = Yup.object({
    sites: Yup.array()
      .of(
        Yup.object({
          name: Yup.string()
            .required(
              l("settings.tab1.form.place.validation.required") ||
                "Place is required!"
            )
            .min(
              4,
              l("settings.tab1.form.title.validation.length") ||
                "Location must be at least 4 characters!"
            ),
          address: Yup.string()
            .required(
              l("settings.tab1.form.address.validation.required") ||
                "Address is required!"
            )
            .min(
              4,
              l("settings.tab1.form.title.validation.length") ||
                "Address must be at least 4 characters!"
            ),
          zipCode: Yup.string()
            .required(
              l("register.step1.form.zipCode.validation.required") ||
                "Zip code is required!"
            )
            .min(
              4,
              l("settings.tab1.form.title.validation.length") ||
                "Zip code must be at least 4 characters!"
            ),
          country: Yup.string().required(
            l("register.step1.form.country.validation.required") ||
              "Country is required!"
          ),
        })
      )
      .required(),
  });

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep2FormValues>({
    initialValues: {
      sites: formData?.step2Data?.sites || [],
    },
    enableReinitialize: true,
    validationSchema: formSchema,
    //---------onSubmit--------------
    onSubmit: async (values) => {
      setLoading(true);
      const token = localStorage.getItem("sp_token");
      const trialId = localStorage.getItem("currentTrialEditId");
      const allSites = [...values.sites, ...selectedSites];
      const payload = {
        TrialSites: allSites.map((site) => ({
          name: site.name,
          address: site.address,
          zipCode: site.zipCode,
          country: site.country,
        })),
      };
      console.log("Payload in step 2:", payload);
      setFormData({ step2Data: { sites: values.sites } });
      try {
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step2`,
          {
            payload,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("RESPONSE in create trial step 2:", response);
        setFormData({ step2Data: { sites: values.sites } });
        document.cookie =
          "createTrialStep2Completed=true; Path=/; max-age=7200";
        router.push("/create-trial/step3");
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            typeof error.response?.data === "string"
              ? error.response.data
              : JSON.stringify(error.response?.data);

          setError(errorMessage || "An unknown error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  console.log("Initial Values:", formik.initialValues);
  const initialValues = formik.initialValues.sites;

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

  //------------------ remove site ----------------
  const removeSite = (index: number) => {
    const updatedSites = [...formik.values.sites];
    updatedSites.splice(index, 1);
    formik.setFieldValue("sites", updatedSites, false);
  };
  

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form
      className="flex flex-col gap-12 wrapper"
      onSubmit={formik.handleSubmit}
    >
      {loading && <Spinner />}
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="inclusionDisease" className="text-sm font-semibold">
          List of Sites
        </label>
        <SiteDropdown
          value={selectedSites}
          onChange={(value) => {
            setSelectedSites(value);
            formik.setFieldValue("selectedSites", value);
          }}
        />
      </div>

      {!showSiteFields && (
        <div className="flex justify-center lg:justify-start gap-4 xl:w-1/2">
          <CustomButton
            title="+ Add a site manually"
            containerStyles="custom-width3-btn rounded-lg bg-secondary-50 hover1"
            handleClick={() => setShowSiteFields(true)}
          />
        </div>
      )}

      {showSiteFields || initialValues.length>0 && (
        <>
          {formik.values.sites.map((_, index) => (
            <div
              key={index}
              className={`flex flex-col gap-6 xl:w-1/2 ${
                index > 0 ? "border-t-2 border-gray-300 pt-12 " : ""
              }`}
            >
              <InputField
                label="Location"
                name="name"
                type="text"
                placeholder="e.g. Copenhagen University"
                formik={formik}
                siteIndex={index}
              />
              <InputField
                label="Address"
                name="address"
                type="text"
                placeholder="e.g. Street 1"
                formik={formik}
                siteIndex={index}
              />
              <InputField
                label="Zip code"
                name="zipCode"
                type="text"
                placeholder="Zip code"
                formik={formik}
                siteIndex={index}
              />
              <div className="flex flex-col">
                <label htmlFor={`country-${index}`} className="mb-2">
                  Country<span className="ml-1">*</span>
                </label>
                <CountryDropdown
                  country={formik.values.sites[index].country}
                  setCountry={(value) =>
                    formik.setFieldValue(`sites[${index}].country`, value)
                  }
                  borderColor="#dff2df"
                />
                <small className="text-red-600">
                  {formik.touched.sites?.[index]?.country &&
                    (
                      formik.errors.sites as
                        | FormikErrors<SiteFormValues>[]
                        | undefined
                    )?.[index]?.country}
                </small>
              </div>

              <div className="flex justify-center xs:justify-start gap-4">
                <CustomButton
                  title={l("settings.tab3.btn.text") || "Remove Site"}
                  containerStyles="bg-bgColor-red rounded-lg"
                  textStyles="text-white"
                  handleClick={() => removeSite(index)}
                />
              </div>
            </div>
          ))}

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
          title="Next"
          containerStyles="custom-width3-btn rounded-lg gradient-green1 hover1 mt-4"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep2Form;
