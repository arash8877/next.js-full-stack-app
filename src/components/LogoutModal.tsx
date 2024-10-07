import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import Divider from "@mui/material/Divider";
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

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

//-------------------- main function --------------------------
export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const router = useRouter();
  const { l } = useLanguageStore();

  const handleLogout = () => {
    localStorage.removeItem("trialId");
    localStorage.removeItem("token");
    sessionStorage.removeItem("diseaseModalShown");
    router.push("/login");
  };

  //-------------------- return --------------------------
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {l("modal.logout.header") || "Confirm Log Out"}
        </Typography>
        <Divider
          sx={{
            my: 2,
            width: "60%",
            borderColor: "#DAF5DE",
            borderWidth: "1.5px",
            borderRadius: "2px",
            mx: "auto",
          }}
        />
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          {l("modal.logout.description") || "Are you sure you want to log out?"}
        </Typography>
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
          <CustomButton
            title={l("modal.logout.btn.accept") || "Log Out"}
            containerStyles="bg-gradient-button-dark rounded-lg h-11 w-40 text-white text-sm xs:text-base font-medium"
            handleClick={handleLogout}
          />
        </Box>
      </Box>
    </Modal>
  );
}
