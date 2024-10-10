import { SidebarLayout } from "@/components/SidebarLayout";
import TrialForm from "@/components/TrialForm";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";

export default function TrialPage () {
  const { trialData } = useGetSingleTrialInfo();
  return (
    <SidebarLayout>
      <TrialForm {...trialData}/>
    </SidebarLayout>  )
}