import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Footer from "examples/Footer";
import { DeleteModal } from "components/Modals/Delete";
import { StoryModal } from "components/Modals/Story";
import PropTypes from "prop-types";
import {
  List,
  Typography,
  ListItem,
  Stack,
  styled,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

function Stories() {
  const url = localStorage.getItem("baseURL");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [story, setStory] = useState({});

  useEffect(() => {
    refreshData();
  }, []);

  const handleNewStory = () => {
    setIsOpen(true);
    setStory(null);
  };

  const handleOpenModal = (story) => {
    setIsOpen(true);
    setStory(story);
  };

  const handleCloseModal = () => {
    refreshData();
    setIsOpen(false);
    setIsDeleteOpen(false);
  };

  const handleDeleteModal = (story) => {
    setIsDeleteOpen(true);
    setStory(story);
  };

  const refreshData = async () => {
    try {
      const response = await fetch(url + "/api/menu/1/stories/");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: "15svw",
    maxWidth: "15svw",
    boxShadow: "0 0 0 0",
    border: "3px solid",
    borderColor: "black",
    borderRadius: "20px",
    overflow: "hidden",
  }));

  const NewItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: "3px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: "15svw",
    aspectRatio: "11/20",
    border: "4px solid",
    borderColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    boxShadow: "0 0 0 0",
  }));

  const StyledButton = styled(IconButton)(({ theme }) => ({
    minWidth: "100%",
    minHeight: "100%",
    fontSize: "5rem",
    disableRipple: true,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  }));

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
                  Povesti
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{
                    maxWidth: "100%",
                    minWidth: "100%",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: "20px 3px 20px 0",
                  }}
                >
                  {data.map((story) => (
                    <Item key={story.id}>
                      <StoryCard
                        story={story}
                        handleOpenModal={handleOpenModal}
                        handleDeleteModal={handleDeleteModal}
                      />
                    </Item>
                  ))}
                  <NewItem>
                    <StyledButton disableRipple={true} onClick={handleNewStory}>
                      <AddCircleRoundedIcon />
                    </StyledButton>
                  </NewItem>
                </Stack>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {isOpen && <StoryModal open={isOpen} handleClose={handleCloseModal} story={story} />}
      {isDeleteOpen && (
        <DeleteModal open={isDeleteOpen} handleClose={handleCloseModal} item={story} type="story" />
      )}
      <Footer />
    </DashboardLayout>
  );
}

function StoryCard({ story, handleOpenModal, handleDeleteModal }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoading(false);
    }, 500);
  };
  return story != null ? (
    <MDBox bgColor="black" sx={{ aspectRatio: "11/20" }}>
      <Typography
        variant="h5"
        color="white"
        sx={{ textAlign: "left", padding: "5px 0 0 10px", color: "#ffffff", fontWeight: 200 }}
      >
        {story.title}
      </Typography>
      <MDBox
        sx={{
          position: "relative", // Add this line
          width: "100%",
          aspectRatio: "11/17",
        }}
      >
        {isImageLoading && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0)",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <img
          src={story.b2StorageFile ? story.b2StorageFile : "https://via.placeholder.com/150"}
          alt="story"
          style={{ width: "100%", aspectRatio: "11/17", objectFit: "cover", maxWidth: "100%" }}
          onLoad={handleImageLoad}
        />
        <Typography
          variant="body2"
          color="white"
          sx={{
            position: "absolute",
            maxWidth: "100%",
            minWidth: "100%",
            maxHeight: "100%",
            textAlign: "left",
            justifyContent: "flex-start",
            padding: "5px 0 5px 10px",
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            fontWeight: 200,
            transform: "translateY(-100%)",
            alignItems: "stretch",
          }}
        >
          {story.description}
        </Typography>
      </MDBox>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: "100%", aspectRatio: "11/3" }}
      >
        <MDButton color="primary" style={{ width: "40%" }} onClick={() => handleOpenModal(story)}>
          <Icon
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            edit
          </Icon>
        </MDButton>
        <MDButton color="error" style={{ width: "40%" }} onClick={() => handleDeleteModal(story)}>
          <Icon
            href="#"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            delete
          </Icon>
        </MDButton>
      </MDBox>
    </MDBox>
  ) : (
    <MDBox>
      <CircularProgress />
    </MDBox>
  );
}

StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleDeleteModal: PropTypes.func.isRequired,
};

export default Stories;
