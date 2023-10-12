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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function Evenimente() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Evenimente
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            {/* <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            fata de anul trecut */}
            Evenimente Pe Urmatoarea Perioada
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="Bucuresti - Vizita manager"
          dateTime="15 OCT 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="Sibiu, Brasov - Refacere inventar"
          dateTime="19 OCT 11:00 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Toate - Factura utilitati ENEL"
          dateTime="26 NOI 9:30 AM"
        />
        <TimelineItem
          color="warning"
          icon="calendar_month_outlined"
          title="Constanta - Concediu barman Matei"
          dateTime="30 NOI - 5 DEC"
        />
        <TimelineItem
          color="primary"
          icon="priority_high_rounded"
          title="Bucuresti, Sibiu, Brasov - Control SANEPID"
          dateTime="18 DEC 9:00 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default Evenimente;
