"use client";

import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icons } from "../../../utils/Icon";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOOD } from "../../../graphql/actions/get.food";
import { format } from "timeago.js";
import Loader from "../layouts/loader";
import { DELETE_FOOD } from "../../../graphql/actions/delete.food";
import toast from "react-hot-toast";

const FoodData = () => {
  const { data, loading, refetch } = useQuery(GET_FOOD);
  const [deleteFood] = useMutation(DELETE_FOOD);

  const foods = data?.getLoggedInRestaurantFoods?.foods;

  const handleDeleteFood = async (id: string) => {
    console.log(id);

    await deleteFood({
      variables: {
        id,
      },
    })
      .then(() => {
        toast.success("Food Deleted Successfully!");
        refetch();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const columns: GridColDef<IFoodData>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.5,
    },
    {
      field: "totalOrders",
      headerName: "Total Orders",
      type: "number",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <div className="w-full flex justify-start">
            <span
              className="cursor pointer text-3xl"
              onClick={() => handleDeleteFood(params.row.id)}
            >
              {Icons.delete}
            </span>
          </div>
        );
      },
    },
  ];

  const rows: IFoodData[] = [];

  foods?.map((i: IFoodData) => {
    rows.push({
      id: i.id,
      name: i.name,
      price: i.price + "$",
      totalOrders: 10,
      createdAt: format(i.createdAt),
    });
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box
        m={"40px 60 0 0"}
        height={"85vh"}
        overflow={"hidden"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
            color: "#fff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#fff",
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={true} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default FoodData;
