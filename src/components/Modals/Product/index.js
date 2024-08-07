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
  const [order, setOrder] = useState(item ? item.order : 0);
  const [alergens, setAlergens] = useState(item ? item.alergens : "");
  const [aditives, setAditives] = useState(item ? item.aditives : "");
  const [spiceLvl, setSpiceLvl] = useState(item ? item.spiceLvl : 0);
  const [energy, setEnergy] = useState(item ? item.nutriValues["Valoare energetica"] : "");
  const [weight, setWeight] = useState(item ? item.weight : "");
  const [ingredients, setIngredients] = useState(item ? item.ingredients : "");
  const [fat, setFat] = useState(item ? item.nutriValues["Grasimi"] : "");
  const [saturatedFat, setSaturatedFat] = useState(
    item ? item.nutriValues["Acizi grasi saturati"] : ""
  );
  const [carbs, setCarbs] = useState(item ? item.nutriValues["Glucide"] : "");
  const [sugar, setSugar] = useState(item ? item.nutriValues["Zaharuri"] : "");
  const [protein, setProtein] = useState(item ? item.nutriValues["Proteine"] : "");
  const [salt, setSalt] = useState(item ? item.nutriValues["Sare"] : "");
  const [nutriValuesLink, setNutriValuesLink] = useState(item ? item.nutriValuesLink : "");
  const [available, setAvailable] = useState(item ? item.isAvailable : true);
  const [dairy_free, setDairyFree] = useState(item ? item.isDairyFree : false);
  const [gluten_free, setGlutenFree] = useState(item ? item.isGlutenFree : false);
  const [vegan, setVegan] = useState(item ? item.isVegan : false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setDescription(item.description);
    setPhoto(item.b2StorageFile);
    setPrice(item.price);
    setCategory(item.category.name);
    setOrder(item.order);
    setAlergens(item.alergens);
    setAditives(item.aditives);
    setWeight(item.weight);
    setIngredients(item.ingredients);
    setEnergy(item ? item.nutriValues["Valoare energetica"] : "");
    setFat(item ? item.nutriValues["Grasimi"] : "");
    setSaturatedFat(item ? item.nutriValues["Acizi grasi saturati"] : "");
    setCarbs(item ? item.nutriValues["Glucide"] : "");
    setSugar(item ? item.nutriValues["Zaharuri"] : "");
    setProtein(item ? item.nutriValues["Proteine"] : "");
    setSalt(item ? item.nutriValues["Sare"] : "");
    setNutriValuesLink(item ? item.nutriValuesLink : "");
    setSpiceLvl(item.spiceLvl * 33);
    setDairyFree(item.isDairyFree);
    setGlutenFree(item.isGlutenFree);
    setVegan(item.isVegan);
    setAvailable(item.isAvailable);
  }, [item]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAlergensChange = (event) => {
    setAlergens(event.target.value);
  };

  const handleAditivesChange = (event) => {
    setAditives(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
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

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
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

  const handleNutriValuesLinkChange = (event) => {
    setNutriValuesLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleAvailable = (event) => {
    setAvailable(event.target.checked);
  };

  const handleDairyFree = (event) => {
    setDairyFree(event.target.checked);
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
    setRequestLoading(true);
    let obj = {};
    if (item) {
      obj.id = item.id;
    }
    obj.category = categories.find((cat) => cat.name === category).id;
    obj.order = order;
    obj.name = name;
    obj.description = description;
    obj.price = price;
    if (typeof photo != "string") {
      obj.b2StorageFile = new File([photo], photo.name, { type: photo.type });
    }
    obj.alergens = alergens;
    obj.aditives = aditives;
    obj.weight = weight;
    obj.ingredients = ingredients;
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
    obj.nutriValuesLink = nutriValuesLink;
    obj.isAvailable = available;
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
        fetch(url + "/api/item/", {
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
                rows={5}
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
                  endAdornment: (
                    <InputAdornment style={{ width: "30px" }}>
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
              <TextField
                label="Order"
                value={order}
                onChange={handleOrderChange}
                required
                type="number"
              />
              <div
                style={{
                  height: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FormControlLabel
                  control={<Checkbox checked={available} onChange={handleAvailable} />}
                  label="Activ"
                  labelPlacement="end"
                  value={available}
                  onChange={handleAvailable}
                />
                <FormControlLabel
                  control={<Checkbox checked={dairy_free} onChange={handleDairyFree} />}
                  label="DairyFree"
                  labelPlacement="end"
                  value={dairy_free}
                  onChange={handleDairyFree}
                />
              </div>
              <div
                style={{
                  height: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
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
              <p style={{ marginTop: "4%" }}>Spice Level</p>
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
                style={{ margin: "auto", width: "95%" }}
              />
            </div>

            <div style={formFields}>
              {/* <Collapse in={NutriVal} timeout="auto" unmountOnExit style={formNutriVal}> */}
              <TextField
                label="Weight"
                onChange={handleWeightChange}
                value={weight}
                required
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <p>g</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Ingredients"
                value={ingredients}
                onChange={handleIngredientsChange}
                required
                multiline
                rows={5}
                inputProps={{ maxLength: 300 }}
              />
              <TextField
                label="Aditives"
                value={aditives}
                onChange={handleAditivesChange}
                required
              />
              <TextField
                label="Link Valori Nutritionale"
                value={nutriValuesLink}
                onChange={handleNutriValuesLinkChange}
                required
              />
              <TextField
                label="Valoare energetica"
                onChange={handleEnergyChange}
                value={energy}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Grasimi"
                onChange={handleFatChange}
                value={fat}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Acizi grasi saturati"
                onChange={handleSaturatedFatChange}
                value={saturatedFat}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Glucide"
                onChange={handleCarbsChange}
                value={carbs}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Zaharuri"
                onChange={handleSugarChange}
                value={sugar}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Proteine"
                onChange={handleProteinChange}
                value={protein}
                required
                style={{ width: "100%" }}
              />
              <TextField
                label="Sare"
                onChange={handleSaltChange}
                value={salt}
                required
                style={{ width: "100%" }}
              />
              {/* </Collapse> */}
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
