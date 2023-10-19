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

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Products() {
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
                    rows: [
                      {
                        name: "Sushi Maki",
                        category: "SUSHI",
                        nr_orders: 42,
                        profit: "42 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Cheesecake",
                        category: "SWEETS",
                        nr_orders: 21,
                        profit: "200 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Sake Cherry Blossom",
                        category: "SAKE",
                        nr_orders: 4,
                        profit: "100 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Tempura Udon",
                        category: "NOODLES",
                        nr_orders: 15,
                        profit: "150 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Matcha Latte",
                        category: "BEVERAGES",
                        nr_orders: 30,
                        profit: "80 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Teriyaki Chicken",
                        category: "MAIN DISH",
                        nr_orders: 18,
                        profit: "170 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Edamame",
                        category: "APPETIZERS",
                        nr_orders: 25,
                        profit: "50 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Rainbow Roll",
                        category: "SUSHI",
                        nr_orders: 36,
                        profit: "220 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Miso Soup",
                        category: "SOUPS",
                        nr_orders: 28,
                        profit: "40 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Green Tea Ice Cream",
                        category: "DESSERTS",
                        nr_orders: 14,
                        profit: "90 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "California Roll",
                        category: "SUSHI",
                        nr_orders: 48,
                        profit: "250 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Tiramisu",
                        category: "DESSERTS",
                        nr_orders: 17,
                        profit: "180 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Chicken Katsu",
                        category: "MAIN DISH",
                        nr_orders: 22,
                        profit: "190 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Vegetable Tempura",
                        category: "APPETIZERS",
                        nr_orders: 19,
                        profit: "120 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Dragon Roll",
                        category: "SUSHI",
                        nr_orders: 32,
                        profit: "280 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Beef Teriyaki",
                        category: "MAIN DISH",
                        nr_orders: 26,
                        profit: "220 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Spicy Tuna Roll",
                        category: "SUSHI",
                        nr_orders: 38,
                        profit: "260 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Seafood Ramen",
                        category: "NOODLES",
                        nr_orders: 29,
                        profit: "210 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Ebi Nigiri",
                        category: "SUSHI",
                        nr_orders: 45,
                        profit: "270 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      {
                        name: "Sashimi Platter",
                        category: "SUSHI",
                        nr_orders: 50,
                        profit: "300 RON",
                        action: (
                          <MDBox>
                            <Button href="#" sx={{ pr: 0 }} width="30%">
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
                      },
                      // Add 20 more entries with similar format
                    ],
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
