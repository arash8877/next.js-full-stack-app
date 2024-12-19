"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import Image from "next/image";
import DiseaseDropdown from "./DiseaseDropdown";
import Tag from "./Tag";
import { CreateTrialStep4FormProps, iCategoryProps } from "@/types/index";
import useGetAllMedicalCategories from "@/hooks/useGetAllMedicalCategories";
import axios, { AxiosError } from "axios";
import useCreateTrialStore from "@/stores/createTrial-store";
import Spinner from "./Spinner";
import useLanguageStore from "@/stores/language-store";
import useDiseaseStore from "@/stores/disease-store";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep4Form = () => {
  const { formData, setFormData } = useCreateTrialStore();
  const { categoriesData } = useGetAllMedicalCategories();
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>(
    formData.step4Data.medicalCategoryIds || []
  );
  const [categories, setCategories] = useState<iCategoryProps[]>([]);
  const router = useRouter();
  const [error, setError] = useState("");
  const { selectedInclusionDiseases, setSelectedInclusionDiseases } = useDiseaseStore();
  const { selectedExclusionDiseases, setSelectedExclusionDiseases } = useDiseaseStore();
  const [loading, setLoading] = useState(false);
  const { l } = useLanguageStore();

  //--------useEffect for having the latest categories---------
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep4FormProps>({
    initialValues: {
      inclusionDiseases: formData.step4Data.inclusionDiseases || [],
      inclusionRequirements: formData.step4Data.inclusionRequirements || "",
      exclusionDiseases: formData.step4Data.exclusionDiseases || [],
      exclusionRequirements: formData.step4Data.exclusionRequirements || "",
      medicalCategories: categories.filter(
        (category) =>
          category.medicalCategoryId !== undefined &&
          (formData.step4Data.medicalCategoryIds ?? []).includes(
            category.medicalCategoryId
          )
      ),
    },

    //---------onSubmit--------------
    onSubmit: async (values) => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const trialId = localStorage.getItem("currentTrialEditId");
      try {
        const payload = {
          inclusionDiseases: values["inclusionDiseases"],
          inclusionRequirements: values["inclusionRequirements"],
          exclusionDiseases: values["exclusionDiseases"],
          exclusionRequirements: values["exclusionRequirements"],
          medicalCategories: selectedCategoriesId,
        };
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step4`, //post request
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("RESPONSE", response);
        setFormData({
          ...formData,
          step4Data: {
            ...formData.step4Data,
            inclusionDiseases: values.inclusionDiseases,
            inclusionRequirements: values.inclusionRequirements,
            exclusionDiseases: values.exclusionDiseases,
            exclusionRequirements: values.exclusionRequirements,
            medicalCategoryIds: selectedCategoriesId,
          },
        });
        document.cookie =
          "createTrialStep4Completed=true; Path=/; max-age=7200";
        router.push("/create-trial/step5");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  //----handle click for categories in <tag/> ---------
  const handleClick = (id: number) => {
    if (selectedCategoriesId.includes(id)) {
      console.log(`Removing ID: ${id}`);
      setSelectedCategoriesId(
        selectedCategoriesId.filter((categoryId) => categoryId !== id)
      );
    } else {
      console.log(`Adding ID: ${id}`);
      setSelectedCategoriesId([...selectedCategoriesId, id]);
    }
  };

  // console.log("selectedCategoriesId:", selectedCategoriesId);

  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 mx-auto wrapper"
      onSubmit={formik.handleSubmit}
    >
      {loading && <Spinner />}
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="inclusionDisease" className="text-sm font-semibold">
              Inclusion Disease
            </label>
            <DiseaseDropdown
              value={selectedInclusionDiseases}
              onChange={(value) => {
                formik.setFieldValue("inclusionDiseases", value);
                setSelectedInclusionDiseases(value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="inclusionRequirements"
              className="text-sm font-semibold"
            >
              Inclusion Requirements
            </label>
            <textarea
              name="inclusionRequirements"
              value={formik.values.inclusionRequirements}
              onChange={(e) =>
                formik.setFieldValue("inclusionRequirements", e.target.value)
              }
              placeholder="Enter the eventual inclusion requirements"
              className="register_input custom-border custom_height2 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="exclusionDisease" className="text-sm font-semibold">
              Exclusion Disease
            </label>
            <DiseaseDropdown
              value={selectedExclusionDiseases}
              onChange={(value) => {
                formik.setFieldValue("inclusionDiseases", value);
                setSelectedExclusionDiseases(value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="exclusionRequirements"
              className="text-sm font-semibold"
            >
              Exclusion Requirements
            </label>
            <textarea
              name="exclusionRequirements"
              value={formik.values.exclusionRequirements}
              onChange={(e) =>
                formik.setFieldValue("exclusionRequirements", e.target.value)
              }
              placeholder="Enter the eventual exclusion requirements"
              className="register_input custom-border custom_height2 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full mt-8">
          <label className="text-sm font-semibold">Medical Categories</label>
          <div>
            {categories.map((category: iCategoryProps, index) => (
              <Tag
                key={index}
                title={category.name}
                handleClick={() => {
                  if (category.medicalCategoryId !== undefined) {
                    handleClick(category.medicalCategoryId);
                  }
                }}
                isSelected={selectedCategoriesId.includes(
                  category.medicalCategoryId || -1
                )}
                // isDefault={formData.step4Data.medicalCategoryIds?.includes(
                //   category.medicalCategoryId || -1
                // )}
                icon={
                  <Image
                    src={category.media.filePath}
                    alt={category.media.alt}
                    height={20}
                    width={20}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                }
              />
            ))}
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

export default CreateTrialStep4Form;
