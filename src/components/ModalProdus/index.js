import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base";
import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Collapse,
  InputAdornment,
  Slider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import team1 from "assets/images/team-1.jpg";
import { Form } from "react-router-dom/dist";
import { CheckBox } from "@mui/icons-material";

function findCategory(categories, item) {
  if (!categories) return null;
  categories.map((category) => {
    if (category.id === item.category) {
      return category;
    }
  });
  return null;
}

export default function NestedModal({ open, handleClose, item, categories }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [photo, setPhoto] = useState(item.b2StorageFile);
  const [category, setCategory] = useState(findCategory(categories, item));
  const [alergens, setAlergens] = useState(item.alergens);
  const [NutriVal, toggleNutriVal] = useState(false);

  useEffect(() => {
    console.log(item);
    setName(item.name);
    setDescription(item.description);
    setPhoto(item.b2StorageFile);
    setPrice(item.price);
    setCategory(findCategory(categories, item));
    console.log(photo);
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
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleNutriValClick = () => {
    toggleNutriVal(!NutriVal);
  };

  function valuetext(value) {
    if (value === 100) value = 99;
    console.log(value / 33);
    return `${value}`;
  }

  NestedModal.propTypes = {
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
                rows={4}
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

              {/* <TextField
                id="category"
                select
                label="Category"
                defaultValue={categories[0].name}
                helperText="Please select a category"
                size="small"
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField> */}
              <p>Spice Level</p>
              <Slider
                aria-label="Always visible"
                defaultValue={0}
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
                value="Val energetica"
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Grasimi"
                value="Grasimi"
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Acizi grasi saturati"
                value="Acizi grasi saturati"
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <TextField
                label="Glucide"
                value="Glucide"
                required
                style={{ width: "100%", marginBottom: "8px" }}
              />
              {/* </Collapse> */}
              <FormControlLabel
                control={<Checkbox checked={item.isDairyFree} />}
                label="DairyFree"
                labelPlacement="end"
              />
              <FormControlLabel
                control={<Checkbox checked={item.isGlutenFree} />}
                label="GlutenFree"
                labelPlacement="end"
              />
              <FormControlLabel
                control={<Checkbox checked={item.isVegan} />}
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
              <img
                src={photo}
                alt="Preview"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
              />
              <label htmlFor="raised-button-file">
                <Button component="span">Upload Photo</Button>
              </label>
            </div>
          </form>
          <div>
            <Button
              style={{
                backgroundColor: "blue",
                borderBlockColor: "blue",
                borderColor: "blue",
                margin: "8px 16px",
                color: "white",
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              type="close"
              style={{
                backgroundColor: "red",
                borderBlockColor: "red",
                borderColor: "red",
                margin: "8px 16px",
                color: "white",
              }}
            >
              Cancel
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const styledForm = {
  display: "flex",
  flexDirection: "row",
  width: "90%",
  justifyContent: "space-evenly",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  flex: "row",
  alignItems: "center",
};

const formFields = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "30%",
};

const formNutriVal = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  alignItems: "center",
};

const formPhoto = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "30%",
  alignItems: "center",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 16px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 8px 24px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 32px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 700;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 8px;
    }
  `
);

const ModalButton = styled(Button)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
    outline: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`
);
