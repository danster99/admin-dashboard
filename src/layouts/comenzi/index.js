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
import MDAvatar from "components/MDAvatar";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import data from "layouts/dashboard/components/Comenzi/data";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Orders() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

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
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={4}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="toc"
                    title="Nota De Plata Medie"
                    count="175.32 RON"
                    percentage={{
                      color: "success",
                      amount: "+55%",
                      label: "than lask week",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={4}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title="Medie Comenzi / Ora"
                    count="10.5"
                    percentage={{
                      color: "success",
                      amount: "+3%",
                      label: "than last month",
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ComplexStatisticsCard
                    color="success"
                    icon="store"
                    title="Medie Timp La Masa"
                    count="45 min"
                    percentage={{
                      color: "success",
                      amount: "+1%",
                      label: "than yesterday",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="person_add"
                    title="Procentaj Review"
                    count="27.5%"
                    percentage={{
                      color: "warning",
                      amount: "-2%",
                      label: "than last year",
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="info"
                title="Nr. Comenzi"
                // description={
                //   <>
                //     (<strong>-15%</strong>) fata de 04.10.2023.
                //   </>
                // }
                date="updated at 10:20"
                chart={reportsBarChartData}
              />
            </MDBox>
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
                  Comenzi
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  entriesPerPage={{ defaultValue: 10, entries: [10, 25, 50, 100] }}
                  table={{
                    columns: [
                      { Header: "ID Comanda", accessor: "id", width: "10%" },
                      { Header: "Locatia", accessor: "location" },
                      { Header: "Chelneri", accessor: "waiters" },
                      { Header: "Total", accessor: "total" },
                      { Header: "Timp La Masa", accessor: "time" },
                      { Header: "Review", accessor: "review", width: "10%" },
                    ],
                    rows: [
                      {
                        id: 1,
                        location: "Bucuresti",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "200 RON",
                        time: "45 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 2,
                        location: "Constanta",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([[team3, "Alexa Smith"]])}
                          </MDBox>
                        ),
                        total: "150 RON",
                        time: "30 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="warning">
                              close
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 3,
                        location: "Sibiu",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team4, "John Doe"],
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "300 RON",
                        time: "60 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 4,
                        location: "Brasov",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team3, "Mihai Dobre"],
                            ])}
                          </MDBox>
                        ),
                        total: "250 RON",
                        time: "50 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 5,
                        location: "Bucuresti",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "200 RON",
                        time: "45 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 6,
                        location: "Constanta",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([[team3, "Alexa Smith"]])}
                          </MDBox>
                        ),
                        total: "150 RON",
                        time: "30 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="warning">
                              close
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 7,
                        location: "Sibiu",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team4, "John Doe"],
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "300 RON",
                        time: "60 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 8,
                        location: "Brasov",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team3, "Mihai Dobre"],
                            ])}
                          </MDBox>
                        ),
                        total: "250 RON",
                        time: "50 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 9,
                        location: "Sibiu",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team4, "John Doe"],
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "300 RON",
                        time: "60 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 10,
                        location: "Brasov",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team3, "Mihai Dobre"],
                            ])}
                          </MDBox>
                        ),
                        total: "250 RON",
                        time: "50 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 11,
                        location: "Bucuresti",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([
                              [team1, "Ryan Tompson"],
                              [team2, "Romina Hadid"],
                            ])}
                          </MDBox>
                        ),
                        total: "200 RON",
                        time: "45 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="success">
                              check
                            </Icon>
                          </MDBox>
                        ),
                      },
                      {
                        id: 12,
                        location: "Constanta",
                        waiters: (
                          <MDBox display="flex" py={1}>
                            {avatars([[team3, "Alexa Smith"]])}
                          </MDBox>
                        ),
                        total: "150 RON",
                        time: "30 min",
                        review: (
                          <MDBox display="flex" alignItems="center">
                            <Icon fontSize="small" color="warning">
                              close
                            </Icon>
                          </MDBox>
                        ),
                      },
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

export default Orders;
