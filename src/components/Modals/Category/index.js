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

export function CategoryModal({ open, handleClose, category }) {
  const menu = localStorage.getItem("menu");
  const url = localStorage.getItem("baseURL");
  const [name, setName] = useState(category ? category.name : "");
  const [isFood, setIsFood] = useState(category ? category.isFood : false);
  const [errors, setErrors] = useState({ name: "" });
  const [requestLoading, setRequestLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.trim() === "") {
      setErrors({ ...errors, name: "Category name is required" });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const handleIsFoodChange = (event) => {
    setIsFood(event.target.checked);
  };

  const handleSave = async () => {
    setRequestLoading(true);
    if (errors.name) {
      setRequestLoading(false);
      return;
    }
    let obj = {};
    obj.menu = menu;
    if (category) {
      obj.id = category.id;
    }
    obj.name = name;
    obj.isFood = isFood;

    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      if (category) {
        fetch(url + "/api/category/" + category.id + "/", {
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
        fetch(url + "/api/category/", {
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
        aria-labelledby="category-modal-title"
        aria-describedby="category-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ ...styleSmall, width: "20%" }}>
          <h2 id="category-modal-title">Category</h2>
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
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
              error={errors.name ? true : false}
            />
            <FormControlLabel
              control={<Checkbox checked={isFood} onChange={handleIsFoodChange} />}
              label="Is Food"
            />
          </form>
          <MDBox display="flex" alignItems="center" width="15svw" justifyContent="space-evenly">
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

CategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  category: PropTypes.object,
};
