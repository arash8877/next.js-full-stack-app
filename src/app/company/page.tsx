import { SidebarLayout } from "@/components/SidebarLayout";

export default function CompanyPage() {
  return (
    <SidebarLayout>
          <h2>Welcome to the Company page</h2>
          <p>include the same inputs as register-step1 & editable</p>
          <button className="border p-2">Update</button>

          <p>If you wish to delete the company account please contact support@trialsync.com</p>
    </SidebarLayout>
  );
}
