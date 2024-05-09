import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";

import {
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Slider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import MDButton from "components/MDButton";
import {
  Modal,
  ModalContent,
  StyledBackdrop,
  styledForm,
  formFields,
  formPhoto,
  style,
} from "components/Modals/style";

export function StoryModal({ open, handleClose, story }) {
  const url = localStorage.getItem("baseURL");
  const [title, setTitle] = useState(story ? story.title : "");
  const [description, setDescription] = useState(story ? story.description : "");
  const [photo, setPhoto] = useState(story ? story.b2StorageFile : "");
  const [active, setActive] = useState(story ? story.active : false);
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (!story) return;
    setTitle(story.title);
    setDescription(story.description);
    setPhoto(story.b2StorageFile);
    setActive(story.active);
  }, [story]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (event.target.value.trim() === "") {
      setErrors({ ...errors, title: "Story title is required" });
    } else {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (event.target.value.trim() === "") {
      setErrors({ ...errors, description: "Story description is required" });
    } else {
      setErrors({ ...errors, description: "" });
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleActiveChange = (event) => {
    setActive(event.target.checked);
  };

  const handleSave = async () => {
    setRequestLoading(true);
    if (errors.title || errors.description) {
      setRequestLoading(false);
      return;
    }
    let obj = {};
    if (story) {
      obj.id = story.id;
      obj.menu = story.menu;
    } else {
      obj.menu = 1;
    }
    obj.title = title;
    obj.description = description;
    if (typeof photo != "string") {
      obj.b2StorageFile = new File([photo], photo.name, { type: photo.type });
    }
    obj.active = active;

    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      if (story) {
        fetch(url + "/api/story/" + story.id + "/", {
          method: "PUT",
          body: formData,
          credentials: "include",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        })
          .then((response) => {
            if (response.ok) {
              handleClose();
            } else {
              console.error("Error:", response);
              alert("Something went wrong, please check the fields and try again.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        fetch(url + "/api/story/", {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        })
          .then((response) => {
            if (response.ok) {
              handleClose();
            } else {
              console.error("Error:", response);
              alert("Something went wrong, please check the fields and try again.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error);
      handleClose();
    }
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoading(false);
    }, 500);
  };

  StoryModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    story: PropTypes.object.isRequired,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ ...style, width: "40%" }}>
          <h2 id="parent-modal-title" className="modal-title">
            Edit card
          </h2>
          <form onSubmit={handleSave} style={styledForm}>
            <div style={{ ...formFields, width: "45%" }}>
              <TextField
                label="Title"
                value={title}
                onChange={handleTitleChange}
                required
                error={errors["title"]}
              />
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                required
                multiline
                rows={10}
                inputProps={{ maxLength: 300 }}
              />
              <FormControlLabel
                control={<Checkbox checked={active} onChange={handleActiveChange} />}
                label="Is Active"
                labelPlacement="end"
                value={active}
                onChange={handleActiveChange}
              />
            </div>
            <div style={{ ...formPhoto, width: "45%", height: "100%" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handlePhotoChange}
              />
              {isImageLoading && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "38%",
                    height: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255)",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              <img
                src={
                  photo
                    ? typeof photo === "string"
                      ? photo
                      : URL.createObjectURL(photo)
                    : "https://via.placeholder.com/512"
                }
                alt="Preview"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
                onLoad={handleImageLoad}
              />
              <label htmlFor="raised-button-file">
                <Button component="span" color="primary">
                  Upload Photo
                </Button>
              </label>
            </div>
          </form>

          <MDBox display="flex" aligncards="center" width="15svw" justifyContent="space-evenly">
            <MDButton color="primary" onClick={handleSave} style={{ width: "5svw" }}>
              {requestLoading ? <CircularProgress size={20} color="white" /> : "Save"}
            </MDButton>
            <MDButton onClick={handleClose} type="close" color="error" style={{ width: "5svw" }}>
              Cancel
            </MDButton>
          </MDBox>
        </ModalContent>
      </Modal>
    </div>
  );
}
