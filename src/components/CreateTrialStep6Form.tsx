"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import useLanguageStore from "@/stores/language-store";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep6Form = () => {
  const router = useRouter();
  const { l } = useLanguageStore();


function handleCreateTrial() {
    router.push("/trials");
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
