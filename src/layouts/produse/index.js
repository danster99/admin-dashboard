// @mui material components
import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { NestedModal, DeleteModal } from "components/ModalProdus";

import { Typography } from "@mui/material";

function Products() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    refreshData();
  }, []);

  const handleNewProduct = () => {
    setIsOpen(true);
    setItem(null);
  };

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setItem(item);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsDeleteOpen(false);
    refreshData();
  };

  const handleDeleteModal = (item) => {
    setIsDeleteOpen(true);
    setItem(item);
    refreshData();
  };

  const refreshData = async () => {
    try {
      const categResponse = await fetch(
        "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/categories/"
      );
      const categories = await categResponse.json();
      const response = await fetch(
        "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/items/"
      );
      const jsonData = await response.json();
      const food = jsonData.food;
      var items = [];
      var categ = Object.keys(food);
      const drinks = jsonData.drinks;
      Object.keys(drinks).map((drink) => {
        categ.push(drink);
      });
      categ.map((category) => {
        if (food[category])
          food[category].map((item) => {
            item.category = categories.find((c) => c.id === item.category);
            items.push(item);
          });
        if (drinks[category])
          drinks[category].map((item) => {
            item.category = categories.find((c) => c.id === item.category);
            items.push(item);
          });
      });
      setCategories(categories);
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={15}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Produse
                </MDTypography>
              </MDBox>
              <MDBox mt={3} mx={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <Button
                      href="#"
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%" }}
                      onClick={handleNewProduct}
                    >
                      <Typography variant="button" color={"#ffff"}>
                        Adauga produs
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  entriesPerPage={{ defaultValue: 10, entries: [10, 25, 50, 100] }}
                  canSearch={true}
                  table={{
                    columns: [
                      { Header: "Nume", accessor: "name", width: "25%" },
                      { Header: "Categorie", accessor: "category", width: "15%" },
                      { Header: "Vegan", accessor: "vegan" },
                      { Header: "Dariy Free", accessor: "dairy_free" },
                      { Header: "Gluten Free", accessor: "gluten_free" },
                      { Header: "Pret", accessor: "price", width: "15%" },
                      { Header: "Action", accessor: "action", align: "center", width: "10%" },
                    ],
                    rows: data.map((item) => row(item, handleOpenModal, handleDeleteModal)),
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {isOpen && (
        <NestedModal
          open={isOpen}
          handleClose={handleCloseModal}
          item={item}
          categories={categories}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal open={isDeleteOpen} handleClose={handleCloseModal} item={item} />
      )}
      <Footer />
    </DashboardLayout>
  );
}

function row(item, handleOpenModal, handleDeleteModal) {
  return {
    name: item.name,
    category: item.category.name,
    price: item.price,
    vegan: item.isVegan ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    dairy_free: item.isDairyFree ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    gluten_free: item.isGlutenFree ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    action: (
      <MDBox>
        <Button href="#" sx={{ pr: 0 }} width="30%" onClick={() => handleOpenModal(item)}>
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { info } }) => info.main,
            }}
          >
            edit
          </Icon>
        </Button>
        <Button href="#" sx={{ pl: 0 }} onClick={() => handleDeleteModal(item)}>
          <Icon
            href="#"
            sx={{
              fontWeight: "bold",
              color: ({ palette: { error } }) => error.main,
            }}
          >
            delete
          </Icon>
        </Button>
      </MDBox>
    ),
  };
}

export default Products;