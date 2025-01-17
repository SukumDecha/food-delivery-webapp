import React from "react";
import OrdersData from "../../components/data/order.data";
import InvoiceCharts from "../../components/charts/invoice.chart";

const DashboardData = () => {
  return (
    <div className="w-full flex p-8 items-center justify-between">
      <div className="w-[56%]">
        <h3 className="text-2xl pb-2">Recent Orders</h3>
        <OrdersData isDashboard={true} />
      </div>
      <div className="w-[43%]">
        <h3 className="text-2xl mb-[-2rem]">Orders Analytics</h3>
        <InvoiceCharts />
      </div>
    </div>
  );
};

export default DashboardData;
