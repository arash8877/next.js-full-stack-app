import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import axios from "axios";
import { iUserProps, iUserUpdateProps } from "@/types/index";
import { toast } from "react-toastify";
// import LanguageDropdown from "./LanguageDropdown";
import useLanguageStore from "@/stores/language-store";

//------------------------------------ main function -----------------------------------
const SettingUserInfoForm = ({
  firstName,
  lastName,
  email,
  jobTitle,
  phoneNumber,
}: iUserProps) => {
  const { l } = useLanguageStore();

  //---------------- update user ---------------
  const updateUser = async (data: iUserUpdateProps) => {
    //function will be called in onSubmit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users`, //PATCH request
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
          "Your profile is updated successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
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
    password: Yup.string().min(
      8,
      l("settings.tab4.form.password.validation.format") ||
        "Password must be at least 8 characters"
    ),
    repeatedPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      l("settings.tab4.form.repeatpassword.validation.format") ||
        "Passwords must match!"
    ),
    firstName: Yup.string()
      .required(
        l("settings.tab1.form.firstname.validation.required") ||
          "First name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.firstname.validation.format") ||
          "First name should only contain letters!"
      )
      .min(
        2,
        l("settings.tab1.form.firstname.validation.length") ||
          "First name must be at least 2 characters!"
      ),

    lastName: Yup.string()
      .required(
        l("settings.tab1.form.lastname.validation.required") ||
          "Last name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.lastname.validation.format") ||
          "Last name should only contain letters!"
      )
      .min(
        1,
        l("settings.tab1.form.lastname.validation.length") ||
          "Last name must be at least 1 characters!"
      ),
    phoneNumber: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Phone number is required!"
    ),
    jobTitle: Yup.string().required(
      l("settings.tab1.form.jobtitle.validation.required") ||
        "Job title is required!"
    ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      repeatedPassword: "",
      firstName: firstName,
      lastName: lastName || "",
      email: email || "",
      jobTitle: jobTitle || "",
      phoneNumber: phoneNumber || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        password: values.password,
        repeatedPassword: values.repeatedPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        phoneNumber: values.phoneNumber,
      };

      updateUser(data);
    },
    validationSchema: formSchema,
  });

  //--------------------------Return---------------------------------
  return (
    <form className="flex flex-col gap-6  mt-9" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="flex flex-col gap-[22px] md:w-2/5">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              {l("settings.tab4.form.password.label") || "Change password"}
            </label>
            <input
              name="password"
              type="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              className="register_input custom-border"
            />
            <small className="text-red-600">
              {formik.touched.password && formik.errors.password}
            </small>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="repeatedPassword">
              {l("settings.tab4.form.repeatpassword.label") ||
                "Repeat new password"}
            </label>
            <input
              name="repeatedPassword"
              type="password"
              placeholder="********"
              value={formik.values.repeatedPassword}
              onChange={formik.handleChange("repeatedPassword")}
              onBlur={formik.handleBlur("repeatedPassword")}
              className="register_input custom-border "
            />
            <small className="text-red-600">
              {formik.touched.repeatedPassword &&
                formik.errors.repeatedPassword}
            </small>
          </div>
        </div>
        {/* <div className="mb-8">
          <LanguageDropdown />
        </div> */}
      </div>

      <div>
        <p>{l("settings.tab4.email.header") || "Email"}</p>
        <div className="setting_step4_div">
          <p className="text-base text-dark-300">{email}</p>
        </div>
        <p className="text-base	md:w-2/5 font-normal	">
          {l("settings.tab4.email.warning") ||
            "Unfortunately it is not possible to change your email in this version our platform. If you need help we ask you to write to our support team at"}{" "}
          <a
            className="italic underline"
            href="mailto:support@trialsync.com"
            target="_blank"
          >
            {l("settings.tab4.email.support.mail") || "support@trialsync.com"}
          </a>
        </p>
      </div>

      <div className="grid gap-7 md:gap-6 md:w-4/5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">
            {l("settings.tab1.form.firstname.label") || "First Name"}
            <span className="ml-1">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.firstName && formik.errors.firstName}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">
            {l("settings.tab1.form.lastname.label") || "Last Name"}
            <span className="ml-1">*</span>
          </label>
          <input
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.lastName && formik.errors.lastName}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">
            {l("settings.tab1.form.jobtitle.label") || "Job Title"}
            <span className="ml-1">*</span>
          </label>
          <input
            name="jobTitle"
            type="text"
            defaultValue={jobTitle}
            onChange={formik.handleChange("jobTitle")}
            onBlur={formik.handleBlur("jobTitle")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.jobTitle && formik.errors.jobTitle}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">
            {l("settings.tab1.form.jobtitle.label") || "Phone number"}
            <span className="ml-1">*</span>
          </label>
          <input
            name="phoneNumber"
            type="text"
            defaultValue={phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
            className="register_input custom-border"
          />
          <small className="text-red-600">
            {formik.touched.phoneNumber && formik.errors.phoneNumber}
          </small>
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

export default SettingUserInfoForm;
