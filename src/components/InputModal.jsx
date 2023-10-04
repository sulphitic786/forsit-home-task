import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
// import { useContext } from "react";

const InputModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    ProductName: "",
    Status: "",
    Items: 0,
    Price: "",
    Location: "",
    ...initialData,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData({
      ProductName: "",
      Status: "",
      Items: 0,
      Price: "",
      Location: "",
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          name="ProductName"
          value={formData.ProductName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="Status"
          value={formData.Status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Items"
          name="Items"
          value={formData.Items}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="Price"
          value={formData.Price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="Location"
          value={formData.Location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          Add Product
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InputModal;
