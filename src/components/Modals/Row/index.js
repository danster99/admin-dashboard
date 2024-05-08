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
  const [title, setTitle] = useState(row ? row.title : "");
  const [order, setOrder] = useState(row ? row.order : 0);
  const [errors, setErrors] = useState({ title: "" });

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
    if (errors.title) {
      return;
    }
    let obj = {};
    obj.menu = 1;
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
          .then((response) => response.json())
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

  console.log("RowModal-row:", row);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="row-modal-title"
        aria-describedby="row-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={styleSmall}>
          <h2 id="row-modal-title">Row</h2>
          <form style={styledForm}>
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
          <MDBox display="flex" alignItems="center" width="70%" justifyContent="space-evenly">
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

RowModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  row: PropTypes.object,
};
