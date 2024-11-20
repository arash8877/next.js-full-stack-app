import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import CountryDropdown from "./CountryDropdown";
import axios from "axios";
import { CompanyInfoProps } from "@/types/index";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";
import useJWTUserInfo from "@/hooks/useJWTUserInfo";

interface UpdateSponsorProps {
  sponsorName: string,
  address: string,
  zipCode: string,
  country: string
}

//------------------------------------ main function -----------------------------------
const CompanyInfoForm = ({
  sponsorName,
  vatNumber,
  address,
  zipCode,
  country,
}: CompanyInfoProps) => {
  const { l } = useLanguageStore();
  const { jwtInfo } = useJWTUserInfo();

  //---------------- update user ---------------
  const updateSponsorData = async (data: UpdateSponsorProps) => {
    //function will be called in onSubmit
    try {
      //eslint-disable-next-line
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsors/${jwtInfo?.sponsor_id}`, //PATCH request
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        l("settings.tab1.form.toast.success") ||
          "The company info is updated successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      // console.log(response);
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
  // eslint-disable-next-line
  const formSchema = Yup.object({
    name: Yup.string()
      .required(
        l("settings.tab1.form.companyName.validation.required") ||
          "Company name is required!"
      )
      .min(
        2,
        l("settings.tab1.form.companyName.validation.length") ||
          "Company name must be at least 2 characters!"
      ),
    address: Yup.string()
      .required(
        l("register.step1.form.address.validation.required") ||
          "Address is required!"
      )
      .min(
        4,
        l("settings.tab1.form.address.validation.length") ||
          "Address must be at least 4 characters!"
      ),
    zipCode: Yup.string()
      .required(
        l("register.step1.form.zipCode.validation.required") ||
          "Zip code is required!"
      )
      .min(
        4,
        l("settings.tab1.form.zipCode.validation.length") ||
          "Zip code must be at least 4 characters!"
      ),
    country: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Country is required!"
    ),
    phoneNumber: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Phone number is required!"
    ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sponsorName: sponsorName,
      vatNumber: vatNumber || "",
      address: address || "",
      zipCode: zipCode || "",
      country: country || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        sponsorName: values.sponsorName,
        address: values.address,
        zipCode: values.zipCode,
        country: values.country,
      };

      console.log(data);
      updateSponsorData(data);
    },
    //validationSchema: formSchema,
  });

  //--------------------------Return---------------------------------
  return (
    <form className="flex flex-col gap-6  mt-9" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="flex flex-col gap-[22px] md:w-2/5"></div>
      </div>

      <div className="grid gap-7 md:gap-6 lg:w-4/5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName">
            {l("settings.tab1.form.companyName.label") || "Company Name"}
            <span className="ml-1">*</span>
          </label>
          <input
            id="companyName"
            name="name"
            type="text"
            value={formik.values.sponsorName}
            onChange={formik.handleChange("companyName")}
            onBlur={formik.handleBlur("companyName")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.sponsorName && formik.errors.sponsorName}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address">
            {l("settings.tab1.form.address.label") || "Address"}
          </label>
          <input
            name="address"
            type="text"
            defaultValue={address}
            onChange={formik.handleChange("address")}
            onBlur={formik.handleBlur("address")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.address && formik.errors.address}
          </small>
        </div>
      </div>

      <div className="grid gap-7 md:gap-6 lg:w-4/5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="zipCode">
            {l("settings.tab1.form.zipCode.label") || "Zip code"}
            <span className="ml-1">*</span>
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formik.values.zipCode}
            onChange={formik.handleChange("zipCode")}
            onBlur={formik.handleBlur("zipCode")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.zipCode && formik.errors.zipCode}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="country">
            {l("settings.tab1.form.country.label") || "Country of residence"}
            <span className="ml-1">*</span>
          </label>
          <CountryDropdown
            country={formik.values.country}
            setCountry={(value) => formik.setFieldValue("country", value)}
            borderColor="#DFF2DF"
          />
          <small className="text-red-600">
            {formik.touched.country && formik.errors.country}
          </small>
        </div>
      </div>

      <div className="grid gap-7 md:gap-6 lg:w-4/5 md:grid-cols-2">
        <div className="">
          <p>{l("settings.tab4.email.header") || "VAT number"}</p>
          <div className="not_editable_div">
            <p className="text-base text-dark-300">123456{vatNumber}</p>
          </div>
          <p className="text-base font-normal">
            {l("settings.tab4.email.warning") ||
              "Unfortunately it is not possible to change the VAT number. If you need help please contact our support team at"}{" "}
            <a
              className="italic underline"
              href="mailto:support@trialsync.com"
              target="_blank"
            >
              {l("settings.tab4.email.support.mail") || "support@trialsync.com"}
            </a>
          </p>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("settings.form.submit") || "Update"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CompanyInfoForm;
