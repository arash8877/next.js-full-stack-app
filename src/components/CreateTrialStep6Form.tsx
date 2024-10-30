"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import useLanguageStore from "@/stores/language-store";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep6Form = () => {
  const router = useRouter();
  const { l } = useLanguageStore();
  const [previewKey, setPreviewKey] = useState("");


useEffect(() => {
  const token = localStorage.getItem("token");
  const trialId = localStorage.getItem("currentTrialEditId");
  try {
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/preview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(response)
      setPreviewKey(response.data);
      console.log(previewKey);
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      //setError(error.response?.data || "An unknown error occurred");
    }
  }
});

async function handleCreateTrial() {
  const token = localStorage.getItem("token");
  const trialId = localStorage.getItem("currentTrialEditId");
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/complete`, //post request
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    localStorage.removeItem("currentTrialEditId");
    router.push("/trials");
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      //setError(error.response?.data || "An unknown error occurred");
    }
  }
}
  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <div
      className="flex flex-col gap-6 wrapper"
    >

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Create"}
          containerStyles="rounded-lg gradient-green1 hover1 mt-4"
          btnType="button"
          handleClick={handleCreateTrial}
        />
      </div>
    </div>
  );
};

export default CreateTrialStep6Form;
