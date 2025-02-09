import StakingOverview from "./StakingOverview";
import StakingLists from "./StakingLists";

const Dashboard = () => {
  return (
    <div className="flex justify-center w-full min-h-screen overflow-x-hidden overflow-y-auto">
      <div className="mt-[200px] mb-20 flex flex-col gap-16 max-w-[1136px] w-full px-4 sm:px-10">
        <StakingOverview />
        <StakingLists />
      </div>
    </div>
  )
}

export default Dashboard