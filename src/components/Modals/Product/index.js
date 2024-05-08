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
import { Height } from "@mui/icons-material";

export function ProductModal({ open, handleClose, item, categories }) {
  const url = localStorage.getItem("baseURL");
  const [name, setName] = useState(item ? item.name : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [price, setPrice] = useState(item ? item.price : "");
  const [photo, setPhoto] = useState(item ? item.b2StorageFile : "");
  const [category, setCategory] = useState(item ? item.category.name : "");
  const [alergens, setAlergens] = useState(item ? item.alergens : "");
  const [spiceLvl, setSpiceLvl] = useState(item ? item.spiceLvl : 0);
  const [energy, setEnergy] = useState(item ? item.nutriValues["Valoare energetica"] : "");
  const [fat, setFat] = useState(item ? item.nutriValues["Grasimi"] : "");
  const [saturatedFat, setSaturatedFat] = useState(
    item ? item.nutriValues["Acizi grasi saturati"] : ""
  );
  const [carbs, setCarbs] = useState(item ? item.nutriValues["Glucide"] : "");
  const [sugar, setSugar] = useState(item ? item.nutriValues["Zaharuri"] : "");
  const [protein, setProtein] = useState(item ? item.nutriValues["Proteine"] : "");
  const [salt, setSalt] = useState(item ? item.nutriValues["Sare"] : "");
  const [dairy_free, setDairyFree] = useState(item ? item.isDairyFree : false);
  const [gluten_free, setGlutenFree] = useState(item ? item.isGlutenFree : false);
  const [vegan, setVegan] = useState(item ? item.isVegan : false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setDescription(item.description);
    setPhoto(item.b2StorageFile);
    setPrice(item.price);
    setCategory(item.category.name);
    setAlergens(item.alergens);
    setEnergy(item ? item.nutriValues["Valoare energetica"] : "");
    setFat(item ? item.nutriValues["Grasimi"] : "");
    setSaturatedFat(item ? item.nutriValues["Acizi grasi saturati"] : "");
    setCarbs(item ? item.nutriValues["Glucide"] : "");
    setSugar(item ? item.nutriValues["Zaharuri"] : "");
    setProtein(item ? item.nutriValues["Proteine"] : "");
    setSalt(item ? item.nutriValues["Sare"] : "");
    setSpiceLvl(item.spiceLvl * 33);
    setDairyFree(item.isDairyFree);
    setGlutenFree(item.isGlutenFree);
    setVegan(item.isVegan);
  }, [item]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAlergensChange = (event) => {
    setAlergens(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    categories.map((option) => {
      if (option.name === event.target.value) {
        setCategory(option.name);
      }
    });
  };

  const handleSpiceLvlChange = (event) => {
    let level = valuetext(event.target.value);
    setSpiceLvl(level);
  };

  const handleEnergyChange = (event) => {
    setEnergy(event.target.value);
  };

  const handleFatChange = (event) => {
    setFat(event.target.value);
  };

  const handleSaturatedFatChange = (event) => {
    setSaturatedFat(event.target.value);
  };

  const handleCarbsChange = (event) => {
    setCarbs(event.target.value);
  };

  const handleSugarChange = (event) => {
    setSugar(event.target.value);
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const handleSaltChange = (event) => {
    setSalt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleDairyFree = () => {
    setDairyFree(!dairy_free);
  };

  const handleGlutenFree = (event) => {
    setGlutenFree(event.target.checked);
  };

  const handleVegan = (event) => {
    setVegan(event.target.checked);
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoading(false);
    }, 500);
  };

  function valuetext(value) {
    if (value === 100) value = 99;
    return `${value}`;
  }

  const handleSave = () => {
    let obj = {};
    if (item) {
      obj.id = item.id;
    }
    obj.category = categories.find((cat) => cat.name === category).id;
    obj.name = name;
    obj.description = description;
    obj.price = price;
    if (typeof photo != "string") {
      obj.b2StorageFile = new File([photo], photo.name, { type: photo.type });
    }
    obj.alergens = alergens;
    obj.spiceLvl = spiceLvl / 33;
    let nv = {
      "Valoare energetica": energy,
      Grasimi: fat,
      "Acizi grasi saturati": saturatedFat,
      Glucide: carbs,
      Zaharuri: sugar,
      Proteine: protein,
      Sare: salt,
    };
    obj.nutriValues = JSON.stringify(nv);
    obj.isDairyFree = dairy_free;
    obj.isGlutenFree = gluten_free;
    obj.isVegan = vegan;

    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      if (item) {
        fetch(url + "/api/item/" + item.id + "/", {
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
        fetch(url + "/api/item/", {
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

  ProductModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
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
            Edit Item
          </h2>
          <form onSubmit={handleSubmit} style={styledForm}>
            <div style={formFields}>
              <TextField label="Name" value={name} onChange={handleNameChange} required />
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                required
                multiline
                rows={10}
                inputProps={{ maxLength: 300 }}
              />
              <TextField
                label="Alergens"
                value={alergens}
                onChange={handleAlergensChange}
                required
              />
              <TextField
                label="Price"
                value={price}
                onChange={handlePriceChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ width: "30px" }}>
                      <p>RON</p>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="category"
                select
                label="Category"
                defaultValue={category}
                onChange={handleCategoryChange}
                helperText="Please select a category"
                size="small"
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <p>Spice Level</p>
              <Slider
                aria-label="Always visible"
                value={spiceLvl}
                onChange={handleSpiceLvlChange}
                getAriaValueText={valuetext}
                step={33}
                marks={[
                  { value: 0, label: "0" },
                  { value: 33, label: "1" },
                  { value: 66, label: "2" },
                  { value: 99, label: "3" },
                ]}
                valueLabelDisplay="off"
                style={{ margin: "auto", width: "90%" }}
              />
            </div>

            <div style={formFields}>
              {/* <Collapse in={NutriVal} timeout="auto" unmountOnExit style={formNutriVal}> */}
              <TextField
                label="Valoare energetica"
                onChange={handleEnergyChange}
                value={energy}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Grasimi"
                onChange={handleFatChange}
                value={fat}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Acizi grasi saturati"
                onChange={handleSaturatedFatChange}
                value={saturatedFat}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Glucide"
                onChange={handleCarbsChange}
                value={carbs}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Zaharuri"
                onChange={handleSugarChange}
                value={sugar}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Proteine"
                onChange={handleProteinChange}
                value={protein}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Sare"
                onChange={handleSaltChange}
                value={salt}
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              {/* </Collapse> */}
              <FormControlLabel
                control={<Checkbox checked={dairy_free} onChange={handleDairyFree} />}
                label="DairyFree"
                labelPlacement="end"
                value={dairy_free}
                onChange={handleDairyFree}
              />
              <FormControlLabel
                control={<Checkbox checked={gluten_free} onChange={handleGlutenFree} />}
                label="GlutenFree"
                labelPlacement="end"
                value={gluten_free}
                onChange={handleGlutenFree}
              />
              <FormControlLabel
                control={<Checkbox checked={vegan} onChange={handleVegan} />}
                label="Vegan"
                labelPlacement="end"
              />
            </div>
            <div style={formPhoto}>
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
                    width: "26%",
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
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
                onLoad={handleImageLoad}
              />
              <label htmlFor="raised-button-file">
                {/* <MDButton color="primary" sx={{ Height: "50%", bgcolor: "primary" }}>
                  Upload Photo
                </MDButton> */}
                <Button component="span" color="primary">
                  Upload Photo
                </Button>
              </label>
            </div>
          </form>

          <MDBox display="flex" alignItems="center" width="15svw" justifyContent="space-evenly">
            <MDButton color="primary" onClick={handleSave} style={{ width: "5svw" }}>
              Save
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
