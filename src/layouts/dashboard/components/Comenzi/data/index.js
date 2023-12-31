/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Icon from "@mui/material/Icon";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
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

  const Review = ({ review }) =>
    review == true ? (
      <Icon
        sx={{
          fontWeight: "bold",
          color: ({ palette: { info } }) => info.main,
        }}
      >
        done
      </Icon>
    ) : (
      <Icon
        sx={{
          fontWeight: "bold",
          color: ({ palette: { error } }) => error.main,
        }}
      >
        close
      </Icon>
    );

  return {
    columns: [
      { Header: "comanda", accessor: "comanda", width: "10%", align: "left" },
      { Header: "locatia", accessor: "locatia", align: "left" },
      { Header: "chelneri", accessor: "chelneri", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      { Header: "timp la masa", accessor: "timp", align: "center" },
      { Header: "review", accessor: "review", align: "center" },
    ],

    rows: [
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Bucuresti
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Sibiu
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Constanta
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Brasov
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Bucuresti
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Sibiu
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        locatia: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Sibiu
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #100
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team1, "Ryan Tompson"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            192.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2h 30min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #101
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            324.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1h 15min
          </MDTypography>
        ),
        review: <Review review={false} />,
      },
      {
        comanda: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            #102
          </MDTypography>
        ),
        chelneri: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            85.5 RON
          </MDTypography>
        ),
        timp: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45min
          </MDTypography>
        ),
        review: <Review review={true} />,
      },
    ],
  };
}
