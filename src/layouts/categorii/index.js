import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { DeleteModal } from "components/Modals/Delete";
import { CategoryModal } from "components/Modals/Category";
import { Typography } from "@mui/material";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";

function Categories() {
  const url = localStorage.getItem("baseURL");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [category, setCategory] = useState({});

  useEffect(() => {
    refreshData();
  }, []);

  const handleNewCategory = () => {
    setIsOpen(true);
    setCategory(null);
  };

  const handleOpenModal = (category) => {
    setIsOpen(true);
    setCategory(category);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsDeleteOpen(false);
    setTimeout(() => refreshData(), 200);
  };

  const handleDeleteModal = (category) => {
    setIsDeleteOpen(true);
    setCategory(category);
    refreshData();
  };

  const refreshData = async () => {
    try {
      const response = await fetch(url + "/api/menu/1/categories/");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  Categorii
                </MDTypography>
              </MDBox>
              <MDBox mt={3} mx={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <MDButton
                      href="#"
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%", bgcolor: "primary" }}
                      onClick={isLoading ? null : handleNewCategory}
                    >
                      <Typography variant="button" color={"#ffff"} fontWeight={"500"}>
                        Adauga categorie
                      </Typography>
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  entriesPerPage={{ defaultValue: 10, entries: [10, 25, 50, 100] }}
                  canSearch={true}
                  table={{
                    columns: [
                      { Header: "Nume", accessor: "name", width: "30%" },
                      { Header: "Numar de produse", accessor: "totalItems", width: "30%" },
                      { Header: "Este mancare", accessor: "isFood" },
                      { Header: "Action", accessor: "action", align: "center", width: "10%" },
                    ],
                    rows: data.map((category) => row(category, handleOpenModal, handleDeleteModal)),
                  }}
                />
                {isLoading && (
                  <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                    <CircularProgress />
                  </div>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {isOpen && <CategoryModal open={isOpen} handleClose={handleCloseModal} category={category} />}
      {isDeleteOpen && (
        <DeleteModal
          open={isDeleteOpen}
          handleClose={handleCloseModal}
          item={category}
          type="category"
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}

function row(category, handleOpenModal, handleDeleteModal) {
  return {
    name: category.name,
    totalItems: category.totalItems,
    isFood: category.isFood ? (
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
        <Button href="#" sx={{ pr: 0 }} width="30%" onClick={() => handleOpenModal(category)}>
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { primary } }) => primary.main,
            }}
          >
            edit
          </Icon>
        </Button>
        <Button href="#" sx={{ pl: 0 }} onClick={() => handleDeleteModal(category)}>
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

export default Categories;
