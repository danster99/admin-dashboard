import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { Modal, ModalContent, StyledBackdrop, styleDelete } from "components/Modals/style";
import Cookies from "js-cookie";

export function DeleteModal({ open, handleClose, item, type }) {
  const url = localStorage.getItem("baseURL");
  const handleDelete = () => {
    fetch(url + "/api/" + type + "/" + item.id + "/", {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
    handleClose();
  };

  DeleteModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
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
        <ModalContent sx={styleDelete}>
          <h2 id="parent-modal-title" className="modal-title">
            Delete Item
          </h2>
          <p id="parent-modal-description" className="modal-description">
            Are you sure you want to delete this item?
          </p>
          <div>
            <Button
              style={{
                backgroundColor: "red",
                borderBlockColor: "red",
                borderColor: "red",
                margin: "8px 16px",
                color: "white",
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              onClick={handleClose}
              type="close"
              style={{
                backgroundColor: "blue",
                borderBlockColor: "blue",
                borderColor: "blue",
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
