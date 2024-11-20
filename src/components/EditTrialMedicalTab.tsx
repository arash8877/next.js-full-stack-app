"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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

//------------------------------------ main function ----------------------------------
export default function EditTrialMedicalTab({
  trialId,
  inclusionDisease,
  exclusionDisease,
  inclusionRequirements,
  exclusionRequirements,
}: CreateTrialStep4FormProps) {
  const { categoriesData } = useGetAllMedicalCategories();
  const medicalCategories = categoriesData;
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>(
    []
  );
  const [categories, setCategories] = useState<iCategoryProps[]>([]);
  const { l } = useLanguageStore();

  //---------------- update trial ---------------
  // eslint-disable-next-line
  const updateTrial = async (data: CreateTrialStep4FormProps) => {
    //function will be called in onSubmit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/edit`, //PATCH request
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
      console.log("Toast success called");
      console.log(response);
    } catch (error) {
      console.error("Error in /users", error);
      toast.error(
        l("settings.tab1.form.toast.error") || "Something went wrong!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
    }
  };

  //----Yup validation ---------
  const formSchema = Yup.object({
    inclusionDisease: Yup.string().required(
      l("settings.tab2.form.inclusionDisease.validation.required") ||
        "Inclusion disease is required!"
    ),
    exclusionDisease: Yup.string().required(
      l("settings.tab2.form.exclusionDisease.validation.required") ||
        "Exclusion disease is required!"
    ),
  });

  //--------------- formik ----------------
  const formik = useFormik<CreateTrialStep4FormProps>({
    initialValues: {
      inclusionDisease: inclusionDisease || [],
      inclusionRequirements: inclusionRequirements || "",
      exclusionDisease: exclusionDisease || [],
      exclusionRequirements: exclusionRequirements || "",
      selectedMedicalCategories: categories.filter(
        (category) =>
          category.medicalCategoryId !== undefined &&
          medicalCategories
            .map((cat) => cat.medicalCategoryId)
            .includes(category.medicalCategoryId)
      ),
    },
    validationSchema: formSchema,
    //----onSubmit-------
    onSubmit: async (values) => {
      console.log("Submit");
      // eslint-disable-next-line
      const data = {
        trialId: trialId,
        inclusionDisease: values.inclusionDisease,
        exclusionDisease: values.exclusionDisease,
      };

      const token = localStorage.getItem("token");
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/edit-medical`,
          {
            inclusionDisease: data.inclusionDisease,
            exclusionDisease: data.exclusionDisease,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response in edit medical:", response);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      }
    },
  });

  //--------useEffect for having the latest categories---------
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  //----handle click for categories in <tag/> ---------
  const handleClick = (id: number) => {
    console.log("category clicked:", id);
    console.log("selectedCategoriesId:", selectedCategoriesId);
    if (selectedCategoriesId.includes(id)) {
      setSelectedCategoriesId(
        selectedCategoriesId.filter((categoryId) => categoryId !== id)
      );
    } else {
      setSelectedCategoriesId([...selectedCategoriesId, id]);
    }
  };

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 md:mt-12 bg-bgColor-200 rounded-lg p-4 xl:p-12">
      <form
        className="flex flex-col gap-6 mx-auto wrapper"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="inclusionDisease"
                className="text-sm font-semibold"
              >
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
              <label
                htmlFor="inclusionRequirements"
                className="text-sm font-semibold"
              >
                Inclusion Requirements:
              </label>
              <input
                name="inclusionRequirements"
                type="text"
                value={formik.values.inclusionRequirements}
                onChange={(e) =>
                  formik.setFieldValue("inclusionRequirements", e.target.value)
                }
                placeholder="Enter the eventual inclusion requirements"
                className="register_input custom-border custom_height2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="exclusionDisease"
                className="text-sm font-semibold"
              >
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
              <label
                htmlFor="exclusionRequirements"
                className="text-sm font-semibold"
              >
                Exclusion Requirements:
              </label>
              <input
                name="exclusionRequirements"
                type="text"
                value={formik.values.exclusionRequirements}
                onChange={(e) =>
                  formik.setFieldValue("exclusionRequirements", e.target.value)
                }
                placeholder="Enter the eventual exclusion requirements"
                className="register_input custom-border custom_height2"
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
    </section>
  );
}
