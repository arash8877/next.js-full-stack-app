"use client";

import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import useLanguageStore from "@/stores/language-store";
import axios from "axios";
import { toast } from "react-toastify";

//--------------------------------- main function -------------------------------
export default function PricePage() {
  const { l } = useLanguageStore();
  const router = useRouter();

  //---------- formik -----------
  const handlePublish = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("sp_token")
        : null;

    try {
      toast.success(
        l("settings.tab1.form.toast.success") || "Trial published successfully",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      router.push("/");

      //eslint-disable-next-line
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/price`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        l("settings.tab1.form.toast.success") || "Trial published successfully",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
      // toast.error(
      //   l("settings.tab1.form.toast.error") || "Something went wrong!",
      //   {
      //     position: "top-center",
      //     autoClose: 2000,
      //     className: "single_line_toast",
      //   }
      // );
    }
  };

  //----------------------------------------- JSX -----------------------------------------
  return (
    <SidebarLayout>
      <div className="bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-[70px]">
          {l("settings.price") || "Publishing Fee"}
        </h1>
        <section className="flex flex-col justify-center gap-4 lg:h-[calc(100vh-200px)] mt-8 2xl:px-12 3xl:px-32">
          <div className="pricing_card 3xl:py-12">
            <h5 className="flex_center font-semibold min-w-[180px] lg:justify-start">
              Setup fee
            </h5>
            <ol className="list-inside list-disc">
              <li>
                Complete trial setup with custom prescreening workflows and full
                integration with selected sites and customized recruitment
                materials across all channels
              </li>
            </ol>
            <h5 className="flex_center justify-end min-w-[180px] lg:justify-end">
              EUR 6500
            </h5>
          </div>

          <div className="pricing_card">
            <h5 className="flex_center font-semibold min-w-[180px] lg:justify-start">
              Per patient enrolled
            </h5>
            <ol className="list-inside list-disc">
              <li>
                Fully pre-screened, qualified patients scheduled directly with
                trial sites, and total consent management
              </li>
              <li>
                Guaranteed quality through automated matching and complete
                patient documentation
              </li>
            </ol>
            <h5 className="flex_center justify-end min-w-[180px] lg:justify-end">
              EUR 3500
            </h5>
          </div>

          <div className="pricing_card">
            <h5 className="flex_center font-semibold min-w-[180px] lg:justify-start">
              Per month
            </h5>
            <ol className="list-inside list-disc">
              <li>
                Continuous optimization of recruitment campaigns across our
                entire partner network
              </li>
              <li>
                Real-time analytics and campaign performance reporting across
                all active channels
              </li>
            </ol>
            <h5 className="flex_center justify-end min-w-[180px] lg:justify-end">
              EUR 399
            </h5>
          </div>

          <div className="flex justify-center px-4 mt-8 lg:mt-8">
            <CustomButton
              title={l("register.step1.form.cta.btn") || "Publish Trial"}
              containerStyles="rounded-lg gradient-green2 text-white hover2 custom-width2-btn"
              handleClick={handlePublish}
              btnType="button"
            />
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
