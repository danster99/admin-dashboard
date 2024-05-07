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
import { NestedModal, DeleteModal } from "components/ModalProdus";
import { Typography } from "@mui/material";
import MDButton from "components/MDButton";

function Categories() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    refreshData();
  }, []);

  const handleNewCategory = () => {
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
      const response = await fetch("https://backend.platepal.eu/api/menu/1/categories/");
      const jsonData = await response.json();
      setData(jsonData);
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
                      onClick={handleNewCategory}
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
                      { Header: "Nume", accessor: "name", width: "25%" },
                      { Header: "Numar de produse", accessor: "totalItems", width: "15%" },
                      { Header: "Este mancare", accessor: "isFood" },
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
      {isOpen && <NestedModal open={isOpen} handleClose={handleCloseModal} item={item} />}
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
    totalItems: item.totalItems,
    isFood: item.isFood ? (
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
              color: ({ palette: { primary } }) => primary.main,
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

export default Categories;
