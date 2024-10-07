import { SidebarLayout } from "@/components/SidebarLayout";

export default function EmployeesPage() {
  return (
    <SidebarLayout>
          <h2>Welcome to the employees page</h2>
          <p>just for admin</p>
          <div className="flex_center">
            <p>full name - email - last login</p>
            <button className="border p-2">Edit</button>
            <button className="border p-2">Delete</button>
          </div>
          <div className="flex_center">
            <p>full name - email - last login</p>
            <button className="border p-2">Edit</button>
            <button className="border p-2">Delete</button>
          </div>
          <div className="flex_center">
            <p>full name - email - last login</p>
            <button className="border p-2">Edit</button>
            <button className="border p-2">Delete</button>
          </div>
    </SidebarLayout>
  );
}
