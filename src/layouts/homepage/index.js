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
import { Typography, Checkbox } from "@mui/material";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import { string } from "prop-types";

function Homepage() {
  const url = localStorage.getItem("baseURL");
  const [rows, setRows] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isRowsLoading, setIsRowsLoading] = useState(true);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (row) => {
    if (selectedRows.includes(row.id)) {
      let tempRows = selectedRows;
      setSelectedRows([...tempRows.filter((r) => r !== row.id)]);
    } else {
      let tempRows = selectedRows;
      tempRows.push(row.id);
      setSelectedRows([...tempRows]);
    }
  };

  const refreshData = async () => {
    try {
      const response = await fetch(url + "/api/menu/1/homepageCards/");
      const json = await response.json();
      const response2 = await fetch(url + "/api/homepage-row/");
      const json2 = await response2.json();
      const rows = json2.filter((row) => Object.keys(json).includes(row.title));
      setRows(rows);
      setIsRowsLoading(false);
      let newCards = [];
      Object.values(json).map((row) => {
        row.map((card) => {
          newCards.push(card);
        });
      });
      setCards(newCards);
      setIsCardsLoading(false);
      if (selectedRows.length == 0) {
        setFilteredCards(newCards);
        console.log("populated filtered cards");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRowsLoading(false);
      setIsCardsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Filtered cards: " + cards.filter((card) => [...selectedRows].includes(card.row)));
    if (selectedRows.length > 0) {
      setFilteredCards(cards.filter((card) => [...selectedRows].includes(card.row)));
    } else setFilteredCards(cards);
  }, [selectedRows]);

  useEffect(() => {
    refreshData();
  }, []);

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
                  Homepage
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                sx={{ justifyContent: "center", display: "flex", flexDirection: "row" }}
              >
                <div style={{ borderRadius: "2px" }}>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Selected", accessor: "selected" },
                        { Header: "Title", accessor: "title" },
                        { Header: "Order", accessor: "order" },
                        { Header: "Action", accessor: "action", align: "center" },
                      ],
                      rows: rows.map((row) =>
                        homepageRow(row, refreshData, refreshData, handleCheckboxChange)
                      ),
                    }}
                  />
                  {isRowsLoading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
                <div>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Title", accessor: "title" },
                        { Header: "Description", accessor: "description" },
                        { Header: "Action", accessor: "action", align: "center" },
                      ],
                      rows: filteredCards.map((card) =>
                        homepageCard(card, refreshData, refreshData)
                      ),
                    }}
                  />
                  {isCardsLoading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

function homepageRow(item, handleOpenModal, handleDeleteModal, handleCheckboxChange) {
  return {
    selected: (
      <Checkbox
        defaultChecked={false}
        onChange={() => handleCheckboxChange(item)}
        color="primary"
        inputProps={{ "aria-label": "checkbox" }}
      />
    ),
    title: item.title,
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

function homepageCard(item, handleOpenModal, handleDeleteModal) {
  return {
    title: item.title,
    description: item.description,
    size: item.size,
    active: item.active ? (
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

export default Homepage;
