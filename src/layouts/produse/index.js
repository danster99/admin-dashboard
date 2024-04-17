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
import { useState } from "react";
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

function Products() {
  const handleOpenModal = (item) => {
    setIsOpen(true);
    setItem(item);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({});

  const data = [
    {
      name: "Cheesecake",
      category: "DESSERTS",
      nr_orders: 21,
      price: 50,
      description: "Delicious cheesecake",
      profit: "200 RON",
    },
    {
      name: "Sake Cherry Blossom",
      category: "DRINKS",
      nr_orders: 4,
      price: 100,
      description: "Sake with cherry blossom",
      profit: "100 RON",
    },
    {
      name: "Tempura Udon",
      category: "NOODLES",
      nr_orders: 15,
      price: 30,
      description: "Udon with tempura",
      profit: "150 RON",
    },
    {
      name: "Matcha Latte",
      category: "DRINKS",
      nr_orders: 30,
      price: 40,
      description: "Matcha latte",
      profit: "80 RON",
    },
    {
      name: "Teriyaki Chicken",
      category: "MAIN DISH",
      nr_orders: 18,
      price: 30,
      description: "Chicken teriyaki",
      profit: "170 RON",
    },
    {
      name: "Edamame",
      category: "APPETIZERS",
      nr_orders: 25,
      price: 20,
      description: "Edamame",
      profit: "50 RON",
    },
    {
      name: "Rainbow Roll",
      category: "SUSHI",
      nr_orders: 36,
      price: 50,
      description: "Rainbow roll",
      profit: "220 RON",
    },
    {
      name: "Miso Soup",
      category: "SOUPS",
      nr_orders: 28,
      price: 20,
      description: "Miso soup",
      profit: "40 RON",
    },
    {
      name: "Green Tea Ice Cream",
      category: "DESSERTS",
      nr_orders: 14,
      price: 30,
      description: "Green tea ice cream",
      profit: "90 RON",
    },
    {
      name: "California Roll",
      category: "SUSHI",
      nr_orders: 48,
      price: 40,
      description: "California roll",
      profit: "250 RON",
    },
    {
      name: "Tiramisu",
      category: "DESSERTS",
      nr_orders: 17,
      price: 60,
      description: "Tiramisu",
      profit: "180 RON",
    },
    {
      name: "Chicken Katsu",
      category: "MAIN DISH",
      nr_orders: 22,
      price: 50,
      description: "Chicken katsu",
      profit: "190 RON",
    },
    {
      name: "Vegetable Tempura",
      category: "APPETIZERS",
      nr_orders: 19,
      price: 42,
      description: "Vegetable tempura",
      profit: "120 RON",
    },
    {
      name: "Dragon Roll",
      category: "SUSHI",
      nr_orders: 32,
      price: 51,
      description: "Dragon roll",
      profit: "280 RON",
    },
    {
      name: "Beef Teriyaki",
      category: "MAIN DISH",
      nr_orders: 26,
      price: 63,
      description: "Beef teriyaki",
      profit: "220 RON",
    },
    {
      name: "Spicy Tuna Roll",
      category: "SUSHI",
      nr_orders: 38,
      price: 32,
      description: "Spicy tuna roll",
      profit: "260 RON",
    },
    {
      name: "Seafood Ramen",
      category: "NOODLES",
      nr_orders: 29,
      price: 60,
      description: "Seafood ramen",
      profit: "210 RON",
    },
    {
      name: "Ebi Nigiri",
      category: "SUSHI",
      nr_orders: 45,
      price: 35,
      description: "Ebi nigiri",
      profit: "270 RON",
    },
    {
      name: "Sashimi Platter",
      category: "SUSHI",
      nr_orders: 50,
      price: 20,
      description: "Sashimi platter",
      profit: "300 RON",
    },
  ];

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
                    rows: data.map((item) => row(item, handleOpenModal)),
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={[style, { width: "240px" }]}>
          <h2 id="child-modal-title" className="modal-title">
            Text in a child modal
          </h2>
          <p id="child-modal-description" className="modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <ModalButton onClick={handleClose}>Close Child Modal</ModalButton>
        </ModalContent>
      </Modal> */}
      <NestedModal open={isOpen} handleClose={handleCloseModal} item={item} />
      <Footer />
    </DashboardLayout>
  );
}

function row(item, handleOpenModal) {
  return {
    name: item.name,
    category: item.category,
    nr_orders: item.nr_orders,
    profit: item.profit,
    action: (
      <MDBox>
        <Button
          href="#"
          sx={{ pr: 0 }}
          width="30%"
          onClick={() =>
            handleOpenModal({
              name: item.name,
              description: item.description,
              price: item.price,
              category: item.category,
              profit: item.profit,
            })
          }
        >
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
