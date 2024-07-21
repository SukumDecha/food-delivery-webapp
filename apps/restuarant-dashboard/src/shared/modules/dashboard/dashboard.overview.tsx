"use client";

import { Icons } from "../../../utils/Icon";
import DashboardCard from "../../components/dashboard/dashboard.card";

const DashboardOverview = () => {
  return (
    <div className="w-full flex items-center px-8 py-6 justify-between flex-wrap gap-2">
      <DashboardCard
        icon={Icons.overview}
        title="Sells Overview"
        color="success"
        percentage="+24%"
        amount={`2000$`}
      />
      <DashboardCard
        icon={Icons.orders}
        title="Total Orders"
        color="error"
        percentage="-10%"
        amount={`210`}
      />
      <DashboardCard
        icon={Icons.reviews}
        title="Shop Reviews"
        color="success"
        percentage="+2%"
        amount={`34`}
      />
      <DashboardCard
        icon={Icons.reviews}
        title="Shop Reviews"
        color="success"
        percentage="+2%"
        amount={`34`}
      />
    </div>
  );
};

export default DashboardOverview;
