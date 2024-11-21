import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import InviteEmployeeForm from "./InviteEmployeeForm";
import useLanguageStore from "@/stores/language-store";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
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

export default function InviteEmployeeModal({ open, onClose }: InviteEmployeeModalProps) {
  const { l } = useLanguageStore();
  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleInvite = () => {
    console.log("Form values:", formik.values);
    if (formik.isValid) {
      if (formRef.current) {
        formRef.current.submit();
        console.log("Form submitted");
      } else {
        console.error("Form reference is null");
      }
    } else {
      console.log("Form validation failed");
    }
    onClose();
  };
  

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
        <Divider sx={{ my: 2, width: "80%", mx: "auto", borderColor: "#DAF5DE", borderWidth: "1.5px" }} />
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          {l("modal.logout.description") || "Please fill out the required fields"}
        </Typography>
        <InviteEmployeeForm ref={formRef} />
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: "18px" }}>
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
            onClick={handleInvite}
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
      </Box>
    </Modal>
  );
}
