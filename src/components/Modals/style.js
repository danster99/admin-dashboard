import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base";
import React from "react";
import PropTypes from "prop-types";

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
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

const styledFormSmall = {
  display: "flex",
  flexDirection: "column",
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

const styleSmall = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
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

const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  flex: "row",
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

// const ModalButton = styled(Button)(
//   ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 600;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   background-color: ${blue[500]};
//   padding: 8px 16px;
//   border-radius: 8px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   border: 1px solid ${blue[500]};
//   box-shadow: 0 2px 1px ${
//     theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(45, 45, 60, 0.2)"
//   }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

//   &:hover {
//     background-color: ${blue[600]};
//   }

//   &:active {
//     background-color: ${blue[700]};
//     box-shadow: none;
//   }

//   &:focus-visible {
//     box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
//     outline: none;
//   }

//   &:disabled {
//     opacity: 0.4;
//     cursor: not-allowed;
//     box-shadow: none;
//     &:hover {
//       background-color: ${blue[500]};
//     }
//   }
// `
//);

export {
  Modal,
  StyledBackdrop,
  styledForm,
  style,
  formFields,
  formNutriVal,
  formPhoto,
  ModalContent,
  Backdrop,
  styleSmall,
  styledFormSmall,
  styleDelete,
};
