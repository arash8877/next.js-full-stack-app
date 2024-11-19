import { useRouter } from "next/navigation";
import useLanguageStore from "@/stores/language-store";

interface StepperProps {
  activeStep: number;
}

//------------------------------------------ main function ------------------------------------------
const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  const router = useRouter();
  const { l } = useLanguageStore();

  const steps = [
    l("register.stepper.step1") || "Title",
    l("register.stepper.step2") || "Site",
    l("register.stepper.step3") || "Time",
    l("register.stepper.step4") || "Medical Info",
    l("register.stepper.step5") || "More Info",
    l("register.stepper.step6") || "Overview",
  ];

  //---------- handleClick ------------
  const handleStepClick = (stepIndex: number) => {
    router.push(`/create-trial/step${stepIndex + 1}`);
  };

  //-------------------------------------- jsx ---------------------------------------
  return (
    <div className="w-full grid grid-cols-2 gap-y-8 gap-x-3 sm:gap-x-7 md:gap-x-7 lg:flex md:justify-between md:gap-6 px-8 2xl:w-2/3 mx-auto">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex justify-start items-center text-xs md:text-sm cursor-pointer"
          onClick={() => handleStepClick(index)}
        >
          <div
            key={index}
            className={`flex_center text-center mr-2 text-sm border h-6 w-6 rounded-full ${
              index < activeStep ? "bg-primary-600" : ""
            } ${index === activeStep ? "bg-gradient-button" : ""}`}
          >
            {index < activeStep ? (
              <span className="text-white">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div>{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
