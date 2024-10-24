import useLanguageStore from "@/stores/language-store";


interface StepperProps {
  activeStep: number;
}

//------------------------------------------ main function ------------------------------------------
const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  const { l } = useLanguageStore(); 
  
  const steps = [
    l("register.stepper.step1") || "Title",
    l("register.stepper.step2") || "Site",
    l("register.stepper.step3") || "Time",
    l("register.stepper.step4") || "Medical Info",
    l("register.stepper.step4") || "More Info",
    l("register.stepper.step4") || "Overview",
  ];


  //-------------------------------------- jsx ---------------------------------------
  return (
    <div className="w-full grid grid-cols-2 gap-y-8 gap-x-3 sm:gap-x-7 md:gap-x-7 md:flex md:justify-between md:gap-6 px-8 xl:w-1/2 mx-auto">
      {steps.map((step, index) => (
        <div
          className="flex justify-start items-center text-xs md:text-sm"
          key={step}
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

