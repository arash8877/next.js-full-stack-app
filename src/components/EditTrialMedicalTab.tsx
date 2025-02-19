"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";
import Tag from "./Tag";
import DiseaseDropdown from "./DiseaseDropdown";
import useGetAllMedicalCategories from "@/hooks/useGetAllMedicalCategories";
import { CreateTrialStep4FormProps, iCategoryProps } from "@/types";
import "react-quill/dist/quill.snow.css";
import useCreateTrialStore from "@/stores/createTrial-store";

//------------------------------------ main function ----------------------------------
export default function EditTrialMedicalTab({
  trialId,
  inclusionCriteria,
  exclusionCriteria,
  conditionOfInterest,
  exclusionCondition,
  medicalCategories,
}: CreateTrialStep4FormProps) {
  const { categoriesData } = useGetAllMedicalCategories();
  //eslint-disable-next-line
  const { formData, setFormData } = useCreateTrialStore();
  console.log("i am medical categories", medicalCategories);

  const initialCategories = (medicalCategories ?? []).filter(
    (category): category is iCategoryProps =>
      category?.medicalCategoryId !== undefined
  );
  const initialCategoriesIds = initialCategories
    .map((item) => item.medicalCategoryId)
    .filter((id): id is number => id !== undefined);
  console.log("initialIDs", initialCategoriesIds);
  const [selectedCategoriesId, setSelectedCategoriesId] =
    useState<number[]>(initialCategoriesIds);
  // prettier-ignore
  const [categories, setCategories] = useState<iCategoryProps[]>([]);
  const { l } = useLanguageStore();

  //--------useEffect to get the latest categories---------
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  //--------------- formik ----------------
  const formik = useFormik<CreateTrialStep4FormProps>({
    initialValues: {
      inclusionCriteria: inclusionCriteria || [],
      conditionOfInterest: conditionOfInterest || "",
      exclusionCriteria: exclusionCriteria || [],
      exclusionCondition: exclusionCondition || "",
      medicalCategories: categories.filter(
        (category) =>
          category.medicalCategoryId !== undefined &&
          (formData.step4Data.medicalCategoryIds ?? []).includes(
            category.medicalCategoryId
          )
      ),
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const payload = {
        inclusionCriteria: values.inclusionCriteria,
        exclusionCriteria: values.exclusionCriteria,
        conditionOfInterest: values.conditionOfInterest,
        exclusionCondition: values.exclusionCondition,
        medicalCategories: selectedCategoriesId,
      };
      const token = localStorage.getItem("sp_token");
      try {
        //eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step4`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Trial is updated successfully", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });

        setTimeout(() => window.location.reload(), 2000);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
        toast.error(
          l("settings.tab1.form.toast.error") || "Something went wrong!",
          {
            position: "top-center",
            autoClose: 2000,
            className: "single_line_toast",
          }
        );
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

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 lg:mt-12 bg-white rounded-lg">
      <form
        className="flex flex-col gap-2 sm:gap-6 mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="inclusionDisease"
                className="text-sm font-semibold"
              >
                Inclusion Disease:
              </label>
              <DiseaseDropdown
                value={formik.values.inclusionCriteria || []}
                onChange={(value) =>
                  formik.setFieldValue("inclusionCriteria", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="conditionOfInterest"
                className="text-sm font-semibold"
              >
                Inclusion Requirements:
              </label>
              <textarea
                name="conditionOfInterest"
                value={formik.values.conditionOfInterest}
                onChange={(e) =>
                  formik.setFieldValue("conditionOfInterest", e.target.value)
                }
                placeholder="Enter the eventual inclusion requirements"
                className="register_input custom-border custom_height3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="exclusionDisease"
                className="text-sm font-semibold"
              >
                Exclusion Disease:
              </label>
              <DiseaseDropdown
                value={formik.values.exclusionCriteria || []}
                onChange={(value) =>
                  formik.setFieldValue("exclusionCriteria", value)
                }
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="exclusionCondition"
                className="text-sm font-semibold"
              >
                Exclusion Requirements:
              </label>
              <textarea
                name="exclusionCondition"
                value={formik.values.exclusionCondition}
                onChange={(e) =>
                  formik.setFieldValue("exclusionCondition", e.target.value)
                }
                placeholder="Enter the eventual exclusion requirements"
                className="register_input custom-border custom_height3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full mt-8">
            <label className="text-sm font-semibold">Medical Categories:</label>
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
                  isDefault={initialCategoriesIds.includes(
                    category.medicalCategoryId || -1
                  )}
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
            title={l("register.step1.form.cta.btn") || "Update"}
            containerStyles="rounded-lg gradient-green1 hover1 mt-4"
            btnType="submit"
          />
        </div>
      </form>
    </section>
  );
}
