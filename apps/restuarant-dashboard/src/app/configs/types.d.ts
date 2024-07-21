type ISidebarItem = {
  title: string;
  url: string;
  icon: any;
};

type MUICircularColorType = {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
};

type IDashboardCard = {
  icon: any;
  title: string;
  percentage: string;
  color: MUICircularColorType.color;
  amount: string;
};

type IOrderData = {
  id: string;
  name: string;
  email: string;
  title: string;
  price: number | string;
  createdAt: Date | string;
};

type IFoodCategory = {
  title: string;
};

type IFoodData = {
  id: string;
  name: string;
  price: number | string;
  totalOrders: number;
  createdAt: Date | string;
};
