import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CountryDropdown from "./CountryDropdown";
import axios from "axios";
// import { AxiosError } from "axios";
import { Step1FormProps } from "@/types/index";
import useLanguageStore from "@/stores/language-store";




//--------- Reusable Input Component ---------
const InputField: React.FC<Step1FormProps> = ({
  label,
  name,
  type,
  placeholder,
  formik,
  icon,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>
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
        name={name}
        type={type}
        placeholder={placeholder}
        value={String(formik.values[name])}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name] && formik.errors[name]}
    </small>
  </div>
);

//-------------------------------------- main function-----------------------------------------
const RegisterStep1Form = () => {
  const router = useRouter();
  // const [error, setError] = useState("");
  const [country, setCountry] = useState("Denmark");
  const { l } = useLanguageStore(); 


  //----------------- Yup validation ---------------
 // eslint-disable-next-line 
const formSchema = Yup.object({
  sponsorName: Yup.string()
    .required(l("settings.tab1.form.sponsorName.validation.required") || "Company name is required!")
    .min(2, (l("settings.tab1.form.sponsorName.validation.length") || "Company name must be at least 2 characters!")),
  vatNumber: Yup.string()
    .required(l("settings.tab1.form.vatNumber.validation.required") || "VAT number is required!")
    .min(4, (l("settings.tab1.form.vatNumber.validation.length") || "VAT number must be at least 4 characters!")),
  address: Yup.string()
    .required(l("register.step1.form.address.validation.required") || "Address is required!")
    .min(4, (l("settings.tab1.form.address.validation.length") || "Address must be at least 4 characters!")),
  zipCode: Yup.string()
    .required(l("register.step1.form.zipCode.validation.required") || "Zip code is required!")
    .min(4, (l("settings.tab1.form.zipCode.validation.length") || "Zip code must be at least 4 characters!")),
  // country: Yup.string()
  //   .required(l("register.step1.form.country.validation.required") || "Country is required!"),
});


  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      sponsorName: "",
      vatNumber: "",
      address: "",
      zipCode: "",
      country: "",
    },
    //-----onSubmit-------
 // eslint-disable-next-line 
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/sponsor`, //post request
          {
            sponsorName: values.sponsorName,
            vatNumber: values.vatNumber,
            address: values.address,
            zipCode: values.zipCode,
            country: country,
          }
        );
        console.log("step1 response:",response)
        localStorage.setItem("sponsorId", response.data.sponsorId);
        document.cookie = "step1Completed=true; Path=/;";

        router.push("/register/step2");
      } catch (error) {
      console.log(error)
      }
    },
    validationSchema: formSchema,
  });


  //--------------------------------------------------Return---------------------------------------------
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        {/* <p className=" text-red-600">{error}</p> */}
      </div>
      <InputField
        label={l("register.step1.form.sponsorName.label") || "Company Name"}
        name="sponsorName"
        type="text"
        placeholder={l("register.step1.form.sponsorName.placeholder") || "Company-name"}
        formik={formik}
      />
      <InputField
        label={l("register.step1.form.vatNumber.label") || "Company VAT number"}
        name="vatNumber"
        type="text"
        placeholder={l('register.step1.form.vatNumber.placeholder') || "e.g. 12345678"}
        formik={formik}
      />
      <InputField
        label={l("register.step1.form.email.label") || "Address"}
        name="address"
        type="text"
        placeholder={l('register.step1.form.email.placeholder') || "e.g. Street 1"}
        formik={formik}
      />
      <InputField
        label={l("register.step1.form.password.label") || "Zip code"}
        name="zipCode"
        type="text"
        placeholder={l("register.step1.form.password.placeholder") || "e.g. 1234"}
        formik={formik}
      />
      <div className="flex flex-col">
        <label htmlFor="country" className="mb-2">
          {l("register.step3.form.country.label") ||"Country"}<span className="ml-1">*</span>
        </label>
        <CountryDropdown
          country={country}
          setCountry={setCountry}
          borderColor="black"
        />
        <small className="text-red-600">
          {formik.touched.country && formik.errors.country}
        </small>
      </div>
      {/* <div className="md:pr-20">
        <Consent
          title={l("register.step1.form.termsandconditions.title") || "Consent to Terms and Conditions"}
          label={l("register.step1.form.termsandconditions.label") || "I have read and agree to the Terms and Conditions."}
          name="consentedToTerms"
          value={formik.values.consentedToTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.consentedToTerms && formik.errors.consentedToTerms
          }
        >
          <small className="text-sm ">
            {l("register.step1.form.termsandconditions.text1") || "By checking this box, you agree to TrialSync's"}{" "}
            <Link
              href="https://www.trialsync.com/terms-and-conditions"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step1.form.termsandconditions.cta.text") || "Terms and Conditions"}
            </Link>{" "}
            {l("register.step1.form.termsandconditions.text2") || "and acknowledge our"}{" "}
            <Link
              href="https://www.trialsync.com/privacy"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step1.form.termsandconditions.privacy.cta.text") || "Privacy Policy"}
            </Link>
            {l("register.step1.form.termsandconditions.text3") || ". We will not sell or share your company information. Your data is used solely to enhance your experience with us."}
          </small>
        </Consent>
      </div> */}
      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default RegisterStep1Form;
