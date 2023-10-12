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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Comenzi from "layouts/dashboard/components/Comenzi";
import Evenimente from "layouts/dashboard/components/Evenimente";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar sx={{ position: "static" }} />
      <MDBox pt={1}>
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="toc"
                title="Comenzi"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Accesari"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Incasari"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Click-uri Review"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Accesari meniu"
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
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Incasari"
                  // description={
                  //   <>
                  //     (<strong>+15%</strong>) fata de anul trecut.
                  //   </>
                  // }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Click-uri Review"
                  // description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Comenzi />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Evenimente />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
