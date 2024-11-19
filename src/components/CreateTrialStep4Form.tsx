"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import Image from "next/image";
import DiseaseDropdown from "./DiseaseDropdown";
import Tag from "./Tag";
import { iCategoryProps } from "@/types/index";
import { CreateTrialStep4FormProps } from "@/types/index";
import useGetAllMedicalCategories from "@/hooks/useGetAllMedicalCategories";
import axios, { AxiosError } from "axios";
import useCreateTrialStore from "@/stores/createTrial-store";
import useLanguageStore from "@/stores/language-store";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep4Form = () => {
  const { formData, setFormData } = useCreateTrialStore();
  const { categoriesData, categoriesError, categoriesIsLoading } =
    useGetAllMedicalCategories();
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>(
    formData.step4Data.medicalCategories || []
  );
  const [categories, setCategories] = useState<iCategoryProps[]>([]);
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  const formSchema = Yup.object({});

  //------get medical category id from selected categories-------
  // const categoryIds = selectedCategories.map(
  //   (category) => category.medicalCategoryId
  // );
  // const medicalCategories = selectedCategories.map((category) => ({
  //   medicalCategoryId: category.medicalCategoryId,
  //   optionalText: "string", // Replace "string" with actual optional text if available
  // }));

  const x = categories.filter(
    (category) =>
      category.medicalCategoryId !== undefined &&
      formData.step4Data.medicalCategories.includes(category.medicalCategoryId)
  );
  console.log("categories", x);

  //----------------- formik -------------------
  const formik = useFormik<CreateTrialStep4FormProps>({
    initialValues: {
      inclusionDisease: formData.step4Data.inclusionDisease || [],
      inclusionRequirements: formData.step4Data.inclusionRequirements || "",
      exclusionDisease: formData.step4Data.exclusionDisease || [],
      exclusionRequirements: formData.step4Data.exclusionRequirements || "",
      selectedMedicalCategories: categories.filter(
        (category) =>
          category.medicalCategoryId !== undefined &&
          formData.step4Data.medicalCategories.includes(
            category.medicalCategoryId
          )
      ),
    },

    validationSchema: formSchema,
    //---------onSubmit--------------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      const trialId = localStorage.getItem("currentTrialEditId");
      try {
        // eslint-disable-next-line
        const payload = {
          inclusionDiseases: values["inclusionDisease"],
          inclusionRequirements: values["inclusionRequirements"],
          exclusionDiseases: values["exclusionDisease"],
          exclusionRequirements: values["exclusionRequirements"],
          medicalCategories: selectedCategoriesId,
        };
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step4`, //post request
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("payloadin step4", payload);
        console.log(response);
        setFormData({
          ...formData,
          step4Data: {
            ...formData.step4Data,
            inclusionDisease: values.inclusionDisease,
            inclusionRequirements: values.inclusionRequirements,
            exclusionDisease: values.exclusionDisease,
            exclusionRequirements: values.exclusionRequirements,
            medicalCategories: selectedCategoriesId,
          },
        });
        router.push("/create-trial/step5");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data || "An unknown error occurred");
        }
      }
    },
  });

  //--------useEffect for having the latest categories---------
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData, categoriesError, categoriesIsLoading]);

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

  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 mx-auto wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 xl:flex-row">
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
  );
};

export default CreateTrialStep4Form;
