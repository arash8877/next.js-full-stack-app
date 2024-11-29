import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
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
  maxWidth: "700px",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  textAlign: "center",
  pt: 2,
  px: 8,
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {l("modal.logout.header") || "Invite an Employee"}
        </Typography>
        <Divider
          sx={{
            my: 2,
            width: "80%",
            mx: "auto",
            borderColor: "#DAF5DE",
            borderWidth: "1.5px",
          }}
        />
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          {l("modal.logout.description") ||
            "Please provide the job tile and email of the invited employee"}
        </Typography>

        <div className="rounded-xl py-8 px-4 md:px-12 lg:px-12 lg:mx-12  mt-12 bg-gray-100">
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
          className="flex flex-col items-center gap-6 mt-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-6 items-center w-full">
            <div className="grid gap-7 md:gap-6 lg:w-4/5">
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
          </div>
          <Box
            sx={{
              mt: 8,
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
              sx={{
                textTransform: "none",
                bgcolor: "#17342E",
                color: "white",
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
