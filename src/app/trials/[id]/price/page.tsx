"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import useLanguageStore from "@/stores/language-store";

export default function PricePage() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <div className="bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-[70px]">
          {l("settings.price") || "Pricing Model"}
        </h1>

        <div className="flex flex-col gap-4 mt-8">
          <div className="pricing_card">
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
        </div>
      </div>
    </SidebarLayout>
  );
}
