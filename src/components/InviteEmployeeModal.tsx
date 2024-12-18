import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AxiosError } from "axios";
import Divider from "@mui/material/Divider";
import useLanguageStore from "@/stores/language-store";
import { InputField } from "./CustomInputField";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  textAlign: "center",
  pt: 2,
  px: 4,
  pb: 3,
  "@media (min-width:478px)": {
    pb: 6,
    pt: 6,
  },
};

interface InviteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

//------------------------------- main function -------------------------------
export default function InviteEmployeeModal({
  open,
  onClose,
}: InviteEmployeeModalProps) {
  const { l } = useLanguageStore();
  // eslint-disable-next-line
  const [error, setError] = useState("");

  //----------- Yup ------------
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
    jobTitle: Yup.string()
      .required("Job title is required!")
      .min(2, "Job title must be at least 2 characters!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email format"),
  });

  //------------- Formik -----------
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
    },
    validationSchema: formSchema,

    //----- onSubmit -----
    // eslint-disable-next-line
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      console.log("Submitting form with values:", values);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/invite`,
          {
            redirectUri: `${window.location.origin}/employees/accept-invitation`,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            jobTitle: values.jobTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response for invite:", response);
        console.log("invite form submitted");
        onClose();
        toast.success("Invitation is sent successfully", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            setError(error.response.data);
          } else {
            setError("An unknown error occurred");
            toast.error("Something went wrong!", {
              position: "top-center",
              autoClose: 2000,
              className: "single_line_toast",
            });
          }
        }
      }
    },
  });

  //------------------------------------ JSX ------------------------------------
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p id="modal-modal-title" className="text-2xl font-semibold	">
          {l("modal.logout.header") || "Invite an Employee"}
        </p>
        <Divider
          sx={{
            my: 2,
            width: "80%",
            mx: "auto",
            borderColor: "#DAF5DE",
            borderWidth: "1.5px",
          }}
        />
        <p id="modal-modal-description" className="mt-1">
          {l("modal.logout.description") ||
            "Please provide the job tile and email of the invited employee"}
        </p>

        <div className="rounded-xl py-8 px-4 md:px-12 lg:px-12 mt-8 bg-gray-100">
          <p className="text-sm md:text-base text-center">
            {l("error.description") ||
              "Unfortunately it is not possible to add a new admin yet, if a new admin is required, please contact"}
          </p>
          <a
            className="italic text-sm lg:text-base my-4 text-blue-400"
            href={l("support.float.url") || "mailto:support@trialsync.com"}
            target="_blank"
          >
            {l("support.float.email") || "support@trialsync.com"}
          </a>
        </div>
        <form
          className="flex flex-col gap-6 mt-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-4 w-full">
            <InputField
              label={l("register.step2.form.jobTitle.label") || "First name"}
              name="firstName"
              type="text"
              placeholder="e.g. John"
              formik={formik}
            />
            <InputField
              label={l("register.step2.form.email.label") || "lastName"}
              name="lastName"
              type="test"
              placeholder="e.g. Doe"
              formik={formik}
            />

            <InputField
              label={l("register.step2.form.jobTitle.label") || "Job title"}
              name="jobTitle"
              type="text"
              placeholder="e.g. Manager"
              formik={formik}
            />
            <InputField
              label={l("register.step2.form.email.label") || "Email"}
              name="email"
              type="email"
              placeholder="e.g. employee@email.com"
              formik={formik}
              icon="/email_icon.svg"
            />
          </div>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                textTransform: "none",
                borderColor: "#17342E",
                color: "black",
                width: "105px",
                height: "44px",
                borderRadius: "8px",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              {l("modal.logout.btn.cancel") || "Cancel"}
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="gradient-green1"
              sx={{
                textTransform: "none",
                color: "black",
                width: "105px",
                height: "44px",
                borderRadius: "8px",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              {l("modal.logout.btn.accept") || "Invite"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
