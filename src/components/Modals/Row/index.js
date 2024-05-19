import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
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
import {
  Modal,
  ModalContent,
  StyledBackdrop,
  styledForm,
  formFields,
  formPhoto,
  styleSmall,
} from "components/Modals/style";

export function RowModal({ open, handleClose, row }) {
  const url = localStorage.getItem("baseURL");
  const menu = localStorage.getItem("menu");
  const [title, setTitle] = useState(row ? row.title : "");
  const [order, setOrder] = useState(row ? row.order : 0);
  const [errors, setErrors] = useState({ title: "" });
  const [requestLoading, setRequestLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (event.target.value.trim() === "") {
      setErrors({ ...errors, title: "Row title is required" });
    } else {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSave = async () => {
    setRequestLoading(true);
    if (errors.title) {
      setRequestLoading(false);
      return;
    }
    let obj = {};
    obj.menu = menu;
    if (row) {
      obj.id = row.id;
    }
    obj.title = title;
    obj.order = order;

    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      if (row) {
        fetch(url + "/api/homepage-row/" + row.id + "/", {
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
        fetch(url + "/api/homepage-row/", {
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="row-modal-title"
        aria-describedby="row-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ ...styleSmall, width: "20%" }}>
          <h2 id="row-modal-title">Row</h2>
          <form
            style={{
              ...styledForm,
              flexDirection: "column",
              justifyContent: "space-evenly",
              gap: "20px",
              width: "80%",
            }}
          >
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              required
              error={errors.title ? true : false}
            />
            <TextField
              label="Order"
              value={order}
              onChange={handleOrderChange}
              required
              type="number"
            />
          </form>
          <MDBox
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="15svw"
            justifyContent="space-evenly"
          >
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

RowModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  row: PropTypes.object,
};
