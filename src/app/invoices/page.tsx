"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CustomButton from "@/components/CustomButton";
import useLanguageStore from "@/stores/language-store";

export default function CompanyPage() {
  const { l } = useLanguageStore();

  const invoices = [
    {
      invNumber: "INV-001",
      amount: 1500,
      isPaid: true,
    },
    {
      invNumber: "INV-002",
      amount: 3000,
      isPaid: false,
    },
    {
      invNumber: "INV-003",
      amount: 500,
      isPaid: true,
    },
    {
      invNumber: "INV-004",
      amount: 1200,
      isPaid: false,
    },
  ];

  function viewInvoicePdf() {
    console.log("View Invoice PDF");
  }

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Invoices"}
      </h1>
      <div className="overflow-x-auto bg-white wrapper rounded-3xl">
        <table className="min-w-full bg-white ">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-6">Invoice Number</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{item.invNumber}</td>
                <td className="py-4 px-6">${item.amount.toFixed(2)}</td>
                <td className="py-4 px-6">{item.isPaid ? "Paid" : "Unpaid"}</td>
                <td className="py-4 px-6">
                  <CustomButton
                    title={l("forgotpassword.form.submit") || "View"}
                    containerStyles="rounded-lg flex_center bg-gradient-button h-8 custom-padding "
                    btnType="button"
                    handleClick={viewInvoicePdf}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}
