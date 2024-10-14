import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { iUserProps, iUserUpdateProps } from "@/types/index";
import { toast } from "react-toastify";
// import LanguageDropdown from "./LanguageDropdown";
import useLanguageStore from "@/stores/language-store";

//------------------------------------ main function -----------------------------------
const AcceptInvitationForm = ({
  firstName,
  lastName,
  jobTitle,
  email,
}: iUserProps) => {
    const router = useRouter();
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
          "Your profile is created successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      router.push("/login");
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
    jobTitle: Yup.string().required(
      l("settings.tab1.form.jobtitle.validation.required") ||
        "Job title is required!"
    ),
    email: Yup.string()
      .required(
        l("login.form.email.validation.required") || "Email is required!"
      )
      .email(l("Invalid email format") || "Invalid email format"),

    password: Yup.string()
      .required(
        l("login.form.password.validation.required") || "Password is required!"
      )
      .min(
        8,
        l("settings.tab4.form.password.validation.format") ||
          "Password must be at least 8 characters"
      ),
    repeatedPassword: Yup.string()
      .required(
        l("login.form.password.validation.required") || "Repeat password is required!"
      )
      .oneOf(
        [Yup.ref("password")],
        l("settings.tab4.form.repeatpassword.validation.format") ||
          "Passwords must match!"
      ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: firstName,
      lastName: lastName || "",
      jobTitle: jobTitle || "",
      email: email || "",
      password: "",
      repeatedPassword: "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        email: values.email,
        password: values.password,
        repeatedPassword: values.repeatedPassword,
      };

      updateUser(data);
    },
    validationSchema: formSchema,
  });

  //--------------------------Return---------------------------------
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
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
        <label htmlFor="jobtitle">
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
        <label htmlFor="email">
          {l("settings.tab1.form.email.label") || "Email"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="email"
          type="email"
          defaultValue={email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className="register_input custom-border"
        />
        <small className="text-red-600">
          {formik.touched.email && formik.errors.email}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">
          {l("settings.tab4.form.password.label") || "Password"}<span className="ml-1">*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Minimum 8 characters"
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
          {l("settings.tab4.form.repeatpassword.label") || "Repeat password"}<span className="ml-1">*</span>
        </label>
        <input
          name="repeatedPassword"
          type="password"
          placeholder="Repeat password"
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange("repeatedPassword")}
          onBlur={formik.handleBlur("repeatedPassword")}
          className="register_input custom-border "
        />
        <small className="text-red-600">
          {formik.touched.repeatedPassword && formik.errors.repeatedPassword}
        </small>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("settings.form.submit") || "Accept"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default AcceptInvitationForm;
