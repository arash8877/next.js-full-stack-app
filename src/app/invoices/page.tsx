"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import useLanguageStore from "@/stores/language-store";
import useGetInvoicesInfo from "@/hooks/useGetInvoicesInfo";

export default function CompanyPage() {
  const { l } = useLanguageStore();
  const { invoiceData } = useGetInvoicesInfo();

  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between gap-3 md:flex-row lg:gap-4 mb-8">
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Invoices"}
        </h1>
        <div className="flex_center rounded-lg py-8 px-4 text-center h-[44px] max-w-[300px] bg-secondary-50 cursor-pointer">
          Currently, it is not possible to view invoice details. We are working
          on it.
        </div>
      </div>

      <div className="overflow-x-auto bg-white wrapper rounded-3xl">
        <table className="min-w-full bg-white ">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-6 hidden md:table-cell">Invoice Number</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6 ">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6 hidden md:table-cell">
                  {item.invoiceId}
                </td>
                <td className="py-4 p-6">${item.invoiceAmount.toFixed(2)}</td>
                <td className="py-4 px-6">{item.isPaid ? "Paid" : "Unpaid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {invoiceData.length === 0 && (
        <div className="w-full flex justify-center mt-20">
          <h2 className="text-lg font-semibold text-center">
            {l("trialoverview.warning.notrials") || "You have no invoices yet"}
          </h2>
        </div>
      )}
    </SidebarLayout>
  );
}
