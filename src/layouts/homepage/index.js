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
import { Typography, Checkbox, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { capitalize } from "lodash";
import { RowModal } from "components/Modals/Row";
import { DeleteModal } from "components/Modals/Delete";
import { CardModal } from "components/Modals/Card";

function Homepage() {
  const url = localStorage.getItem("baseURL");
  const [rows, setRows] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isRowsLoading, setIsRowsLoading] = useState(true);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isRowsOpen, setIsRowsOpen] = useState(false);
  const [isCardsOpen, setIsCardsOpen] = useState(false);
  const [isRowsDeleteOpen, setIsRowsDeleteOpen] = useState(false);
  const [isCardsDeleteOpen, setIsCardsDeleteOpen] = useState(false);
  const [row, setRow] = useState({});
  const [card, setCard] = useState({});

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

  const handleCloseRowsModal = () => {
    setIsRowsOpen(false);
    setIsRowsDeleteOpen(false);
    setTimeout(() => refreshData(), 300);
  };

  const handleOpenRowModal = (row) => {
    setRow(row);
    setIsRowsOpen(true);
  };

  const handleOpenRowDeleteModal = (row) => {
    setRow(row);
    setIsRowsDeleteOpen(true);
  };

  const handleNewRowModal = () => {
    setRow(null);
    setIsRowsOpen(true);
  };

  const handleCloseCardsModal = () => {
    setIsCardsOpen(false);
    setIsCardsDeleteOpen(false);
    setTimeout(() => refreshData(), 300);
  };

  const handleOpenCardModal = (card) => {
    setCard(card);
    setIsCardsOpen(true);
  };

  const handleOpenCardDeleteModal = (card) => {
    setCard(card);
    setIsCardsDeleteOpen(true);
  };

  const handleNewCardModal = () => {
    setCard(null);
    setIsCardsOpen(true);
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRowsLoading(false);
      setIsCardsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      setFilteredCards(cards.filter((card) => [...selectedRows].includes(card.row)));
    } else setFilteredCards(cards);
  }, [selectedRows]);

  useEffect(() => {
    refreshData();
  }, []);

  const tableContainer = {
    borderRadius: "20px",
    BorderColor: "black",
    border: "5px solid grey",
    margin: "0 0 20px 0",
    padding: "10px",
    minHeight: "73svh",
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
                  Homepage
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                sx={{ justifyContent: "space-evenly", display: "flex", flexDirection: "row" }}
              >
                <div style={{ ...tableContainer, width: "40%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", padding: "0 5px" }}
                  >
                    <Typography variant="h4" style={{ padding: "10px 0 0 10px" }}>
                      Rows
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{ padding: "0" }}
                      color="primary"
                      onClick={handleNewRowModal}
                    >
                      <AddCircleRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Select", accessor: "selected" },
                        { Header: "Title", accessor: "title", width: "35%" },
                        { Header: "Order", accessor: "order" },
                        { Header: "Action", accessor: "action", align: "center" },
                      ],
                      rows: rows.map((row) =>
                        homepageRow(
                          row,
                          handleOpenRowModal,
                          handleOpenRowDeleteModal,
                          handleCheckboxChange
                        )
                      ),
                    }}
                  />
                  {isRowsLoading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
                <div style={{ ...tableContainer, width: "55%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", padding: "0 5px" }}
                  >
                    <Typography variant="h4" style={{ padding: "10px 0 0 10px" }}>
                      Banners
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{ padding: "0" }}
                      color="primary"
                      onClick={handleNewCardModal}
                    >
                      <AddCircleRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Title", accessor: "title" },
                        { Header: "Size", accessor: "size" },
                        { Header: "Active", accessor: "active" },
                        { Header: "Order", accessor: "order" },
                        { Header: "Action", accessor: "action", align: "center" },
                      ],
                      rows: filteredCards.map((card) =>
                        homepageCard(card, handleOpenCardModal, handleOpenCardDeleteModal)
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
      {isRowsOpen && <RowModal open={isRowsOpen} handleClose={handleCloseRowsModal} row={row} />}
      {isRowsDeleteOpen && (
        <DeleteModal
          open={isRowsDeleteOpen}
          handleClose={handleCloseRowsModal}
          item={row}
          type="homepage-row"
        />
      )}
      {isCardsOpen && (
        <CardModal open={isCardsOpen} handleClose={handleCloseCardsModal} card={card} rows={rows} />
      )}
      {isCardsDeleteOpen && (
        <DeleteModal
          open={isCardsDeleteOpen}
          handleClose={handleCloseCardsModal}
          item={card}
          type="homepage-card"
        />
      )}
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
    order: item.order,
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
    size: capitalize(item.size),
    order: item.order,
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
