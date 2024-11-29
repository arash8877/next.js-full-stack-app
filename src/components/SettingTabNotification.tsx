import { useFormik } from "formik";
import axios from "axios";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import useLanguageStore from "@/stores/language-store";


//------------------------------------ main function ----------------------------------
export default function SettingTabNotification() {
  const { l } = useLanguageStore(); 
  
  //--------- update user -----
  const { userData } = useGetUserInfo();
  const updateUser = async (data: { hasConsentedToMarketing: boolean }) => {
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
      console.log(response)
      toast.success(l("settings.tab1.form.toast.success") || "Notifications is updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
    } catch (error) {
      console.error(l("settings.tab1.form.toast.error") || "Error in /users", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
    }
  };

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hasConsentedToMarketing: userData.hasConsentedToMarketing,
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        hasConsentedToMarketing: values.hasConsentedToMarketing,
      };
      updateUser(data);
    },
  });

  //------------------------------------ return ----------------------------------

  return (
    <div className="pt-14">
      <h2 className="text-base font-semibold	mb-2">
        {l("settings.tab2.header") || "Consent to Email Marketing"}
      </h2>
      <p className="text-base mb-6">
        {l("settings.tab2.marketingconsent.text") || "By checking this box, you agree to receive marketings emails from TrialSync. You can opt-out at any time by following the unsubscribe link in our emails."}
      </p>
      <div className="flex flex-col my-6">
        <form onSubmit={formik.handleSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                name="hasConsentedToMarketing"
                checked={formik.values.hasConsentedToMarketing}
                onChange={formik.handleChange("hasConsentedToMarketing")}
                onBlur={formik.handleBlur("hasConsentedToMarketing")}
                inputProps={{ "aria-label": "controlled" }}
                color="default"
              />
            }
            label={
              <span className="text-sm">
                {l("settings.tab2.marketingconsent.label") || "I agree to receive marketing emails."}
              </span>
            }
          />
          <div className="flex justify-end mt-24">
            <CustomButton
              title={l("settings.form.submit") || "Update"}
              containerStyles="rounded-lg gradient-green1 hover1 mt-20 xs:mt-8"
              btnType="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
