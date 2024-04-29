/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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

import NestedModal from "components/ModalProdus";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { array } from "prop-types";

function Products() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/items/"
        );
        const jsonData = await response.json();
        const food = jsonData.food;
        var items = [];
        var categ = Object.keys(food);
        categ.map((category) => {
          food[category].map((item) => {
            items.push(item);
          });
        });
        const categResponse = await fetch(
          "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/categories/"
        );
        const categories = await categResponse.json();
        setCategories(categories);
        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setItem(item);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const category = (item) => categories.find((category) => category.id === item.category);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3} mb={2}>
            <FormControl sx={{ m: 1, minWidth: 80, height: 50 }}>
              <InputLabel id="demo-select-small-label" size="large">
                Perioada
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-simple-select"
                value={1}
                label="Age"
                size="medium"
                sx={{ height: 30, mt: 1, minWidth: 80 }}
                // onChange={handleChange}
              >
                <MenuItem value={1}>Zi</MenuItem>
                <MenuItem value={2}>Luna</MenuItem>
                <MenuItem value={3}>An</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80, height: 50 }}>
              <InputLabel id="demo-select-small-label" size="large">
                Locatie
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-simple-select"
                value={1}
                label="Age"
                size="medium"
                sx={{ height: 30, mt: 1, minWidth: 80 }}
                // onChange={handleChange}
              >
                <MenuItem value={1}>Toate</MenuItem>
                <MenuItem value={2}>Bucuresti</MenuItem>
                <MenuItem value={3}>Constanta</MenuItem>
                <MenuItem value={4}>Sibiu</MenuItem>
                <MenuItem value={5}>Brasov</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
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
              <MDBox pt={3}>
                <DataTable
                  entriesPerPage={{ defaultValue: 10, entries: [10, 25, 50, 100] }}
                  table={{
                    columns: [
                      { Header: "Nume", accessor: "name", width: "25%" },
                      { Header: "Categorie", accessor: "category", width: "30%" },
                      { Header: "Nr. Comenzi", accessor: "nr_orders" },
                      { Header: "Profit", accessor: "profit", width: "12%" },
                      { Header: "action", accessor: "action", align: "center" },
                    ],
                    rows: data.map((item) => row(category(item), item, handleOpenModal)),
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <NestedModal
        open={isOpen}
        handleClose={handleCloseModal}
        item={item}
        categories={categories}
      />
      <Footer />
    </DashboardLayout>
  );
}

function row(category, item, handleOpenModal) {
  return {
    name: item.name,
    category: category.name,
    nr_orders: item.nr_orders,
    profit: item.profit,
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
        <Button href="#" sx={{ pl: 0 }}>
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
