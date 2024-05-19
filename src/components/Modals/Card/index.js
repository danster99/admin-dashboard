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
  ToggleButtonGroup,
  ToggleButton,
  Typography,
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

export function CardModal({ open, handleClose, card, rows }) {
  const sizeMarks = [
    {
      value: "s",
      label: "S",
    },
    {
      value: "m",
      label: "M",
    },
    {
      value: "l",
      label: "L",
    },
    {
      value: "xl",
      label: "XL",
    },
  ];

  const url = localStorage.getItem("baseURL");
  const menu = localStorage.getItem("menu");
  const [title, setTitle] = useState(card ? card.title : "");
  const [row, setRow] = useState(card ? rows.find((r) => r.id === card.row).title : "");
  const [size, setSize] = useState(card ? sizeMarks.find((s) => s.value === card.size).label : "");
  const [photo, setPhoto] = useState(card ? card.b2StorageFile : "");
  const [order, setOrder] = useState(card ? card.order : 0);
  const [active, setActive] = useState(card ? card.active : false);
  const [links_to, setLinksTo] = useState(card ? card.links_to : "");
  const [errors, setErrors] = useState({ title: "", size: "", links_to: "" });
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [redirectType, setRedirectType] = useState("external");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!card) return;
    setTitle(card.title);
    setRow(rows.length > 0 ? rows.find((r) => r.id === card.row).title : "");
    setSize(sizeMarks.find((s) => s.value === card.size).label);
    setPhoto(card.b2StorageFile);
    setOrder(card.order);
    setActive(card.active);
    setLinksTo(card.links_to);
    if (card.links_to.includes("http")) {
      setRedirectType("external");
    } else if (card.links_to.includes("category")) {
      setRedirectType("category");
    } else {
      setRedirectType("empty");
    }
  }, [card]);

  useEffect(() => {
    fetch(
      localStorage.getItem("baseURL") + "/api/menu/" + localStorage.getItem("menu") + "/categories/"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (event.target.value.trim() === "") {
      setErrors({ ...errors, title: "Card title is required" });
    } else {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleRowChange = (event) => {
    rows.map((row) => {
      if (row.title === event.target.value) {
        setRow(row.title);
      }
    });
  };

  const handleSizeChange = (event) => {
    if (sizeMarks.find((s) => s.label === event.target.value)) {
      setSize(event.target.value);
    } else {
      setErrors({ ...errors, size: "Size should be one of: S M L XL" });
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleActiveChange = (event) => {
    setActive(event.target.checked);
  };

  const handleRedirectChange = (event, newRedirectType) => {
    setRedirectType(newRedirectType);
    if (newRedirectType === "empty") {
      setLinksTo("");
    }
  };

  const handleLinksToChange = (event) => {
    setErrors({ ...errors, links_to: "" });
    if (redirectType === "external") {
      if (!event.target.value.includes("http")) {
        setErrors({ ...errors, links_to: "Please enter a valid URL" });
      }
      setLinksTo(event.target.value);
    } else if (redirectType === "category") {
      categories.map((category) => {
        if (category.name === event.target.value) {
          console.log(category);
          if (category.isFood) setLinksTo("/menu/?category=" + category.name);
          else setLinksTo("/drinks/?category=" + category.name);
        }
      });
    } else if (redirectType === "empty") {
      setLinksTo(null);
    }
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoading(false);
    }, 500);
  };

  const handleSave = async () => {
    setRequestLoading(true);
    if (errors.title) {
      setRequestLoading(false);
      return;
    }
    let obj = {};
    obj.menu = menu;
    if (card) {
      obj.id = card.id;
    }
    obj.title = title;
    obj.row = rows.find((r) => r.title === row).id;
    obj.size = sizeMarks.find((s) => s.label === size).value;
    if (typeof photo != "string") {
      obj.b2StorageFile = new File([photo], photo.name, { type: photo.type });
    }
    obj.order = order;
    obj.active = active;
    obj.links_to = links_to;

    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      if (card) {
        fetch(url + "/api/homepage-card/" + card.id + "/", {
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
        fetch(url + "/api/homepage-card/", {
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

  CardModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
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
                id="row"
                select
                label="Row"
                defaultValue={row}
                onChange={handleRowChange}
                helperText="Please select a row"
                size="small"
              >
                {rows.map((option) => (
                  <MenuItem key={option.id} value={option.title}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="size"
                select
                label="Size"
                defaultValue={size}
                onChange={handleSizeChange}
                helperText="Please select a size"
                size="small"
                error={errors["size"]}
              >
                {sizeMarks.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Order" value={order} onChange={handleOrderChange} required />
              <FormControlLabel
                control={<Checkbox checked={active} onChange={handleActiveChange} />}
                label="Is Active"
                labelPlacement="end"
                value={active}
                onChange={handleActiveChange}
              />
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <Typography id="discrete-slider"> Redirect to{"  "}</Typography>
                <ToggleButtonGroup
                  color={"black"}
                  value={redirectType}
                  onChange={handleRedirectChange}
                  exclusive
                  aria-label="Platform"
                >
                  <ToggleButton value="external" size="small">
                    URL
                  </ToggleButton>
                  <ToggleButton value="category" size="small">
                    Category
                  </ToggleButton>
                  <ToggleButton value="empty" size="small">
                    None
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {redirectType === "external" ? (
                <TextField
                  label="External URL"
                  value={links_to}
                  helperText="Please enter a valid URL"
                  onChange={handleLinksToChange}
                  error={errors["links_to"]}
                  required
                />
              ) : redirectType === "category" ? (
                <TextField
                  id="category"
                  select
                  label="Category"
                  defaultValue={links_to.split("=").pop()}
                  onChange={handleLinksToChange}
                  helperText="Click to select a category"
                  required
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  label="Empty"
                  value=""
                  helperText="This card will not redirect anywhere"
                  disabled
                />
              )}
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
                    height: "50%",
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
