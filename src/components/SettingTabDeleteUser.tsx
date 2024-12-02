import { useState } from "react";
import CustomButton from "./CustomButton";
import DeleteUserModal from "./DeleteUserModal";
import useLanguageStore from "@/stores/language-store";

//------------------------ main function -----------------------------------------
export default function SettingTabDeleteUser() {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const { l } = useLanguageStore();

  function handleOpenModal() {
    setIsDeleteUserModalOpen(!isDeleteUserModalOpen);
  }

  function closeDeleteUserModal() {
    setIsDeleteUserModalOpen(false);
  }

  //------------------------ JSX -----------------------------------------
  return (
    <div className="mt-14	">
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        onClose={closeDeleteUserModal}
      />
      <h1 className="text-2xl	font-semibold	mb-2">
        {l("settings.tab3.header") || "Delete account"}
      </h1>
      <p className="my-8">
        {l("settings.tab3.warning") ||
          "Clicking the 'Delete User' button will permanently remove your account from the platform and erase all associated information."}
      </p>
      <div className="flex justify-end mt-24">
        <CustomButton
          title={l("settings.tab3.btn.text") || "Delete user"}
          containerStyles="bg-bgColor-red rounded-lg"
          textStyles="text-white"
          handleClick={handleOpenModal}
        />
      </div>
    </div>
  );
}
