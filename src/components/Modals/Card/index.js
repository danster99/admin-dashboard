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
  const [title, setTitle] = useState(card ? card.title : "");
  const [row, setRow] = useState(card ? rows.find((r) => r.id === card.row).title : "");
  const [size, setSize] = useState(card ? sizeMarks.find((s) => s.value === card.size).label : "");
  const [photo, setPhoto] = useState(card ? card.b2StorageFile : "");
  const [order, setOrder] = useState(card ? card.order : 0);
  const [active, setActive] = useState(card ? card.active : false);
  const [links_to, setLinksTo] = useState(card ? card.links_to : "");
  const [errors, setErrors] = useState({ title: "", size: "" });

  useEffect(() => {
    if (!card) return;
    setTitle(card.title);
    setRow(card.row);
    setSize(card.size);
    setPhoto(card.b2StorageFile);
    setOrder(card.order);
    setActive(card.active);
    setLinksTo(card.links_to);
  }, [card]);

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

  const handleLinksToChange = (event) => {
    setLinksTo(event.target.value);
  };

  const handleSave = async () => {
    if (errors.title) {
      return;
    }
    let obj = {};
    obj.menu = 1;
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
          .then((response) => response.json())
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
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Save the changes
    handleClose();
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
        <ModalContent sx={style}>
          <h2 id="parent-modal-title" className="modal-title">
            Edit card
          </h2>
          <form onSubmit={handleSave} style={styledForm}>
            <div style={formFields}>
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
              <TextField
                label="Links To"
                value={links_to}
                onChange={handleLinksToChange}
                required
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handlePhotoChange}
              />
              <img
                src={
                  photo
                    ? typeof photo === "string"
                      ? photo
                      : URL.createObjectURL(photo)
                    : "https://via.placeholder.com/512"
                }
                alt="Preview"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
              />
              <label htmlFor="raised-button-file">
                <Button component="span" color="primary">
                  Upload Photo
                </Button>
              </label>
            </div>
          </form>

          <MDBox display="flex" aligncards="center" width="30%" justifyContent="space-evenly">
            <MDButton color="primary" onClick={handleSave}>
              Save
            </MDButton>
            <MDButton onClick={handleClose} type="close" color="error">
              Cancel
            </MDButton>
          </MDBox>
        </ModalContent>
      </Modal>
    </div>
  );
}
