// LogoutModal.js

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CustomButton from "./CustomButton";
import useLanguageStore from "@/stores/language-store";

//--------- style ---------
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
  px: 4,
  pb: 3,
  "@media (min-width:478px)": {
    pb: 4,
    pt: 4,
  },
};

interface DeleteUserProps {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

//----------------------------------- main function ------------------------------------------------------
export default function UnlockApplicantsModal({
  open,
  onClose,
  onUnlock,
}: DeleteUserProps) {
  const { l } = useLanguageStore();

  //----------------------------------- return ------------------------------------------------------
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontSize: "24px" }}
        >
          {l("modal.deleteuser.header") || "Unlock the applicants?"}
        </Typography>
        <Divider
          sx={{
            my: 2,
            borderColor: "#DAF5DE",
            borderWidth: "1.5px",
            borderRadius: "2px",
          }}
        />
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          {l("modal.deleteuser.description") ||
            "We will issue an invoice for EUR 250"}
            <br/>
          {l("modal.deleteuser.description") ||
            "By clicking you confirm our terms and conditions."}
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
              "@media (max-width:478px)": {
                mr: 3,
              },
            }}
          >
            {l("modal.deleteuser.btn.cancel") || "Cancel"}
          </Button>
          <CustomButton
            title={l("modal.deleteuser.btn.accept") || "Unlock"}
            containerStyles="bg-bgColor-red  rounded-lg h-11 w-40 text-white text-base font-medium"
            handleClick={onUnlock}
          />
        </Box>
      </Box>
    </Modal>
  );
}
