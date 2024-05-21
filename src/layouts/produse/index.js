import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Typography, Checkbox, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CircularProgress from "@mui/material/CircularProgress";
import { DeleteModal } from "components/Modals/Delete";
import { ProductModal } from "components/Modals/Product";
import { CategoryModal } from "components/Modals/Category";
import Header from "layouts/profile/components/Header";

function Products() {
  const menu = localStorage.getItem("menu");
  const url = localStorage.getItem("baseURL");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false);
  const [isCategoryDeleteOpen, setIsCategoryDeleteOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});

  const handleCheckboxChange = (categ) => {
    let tempRows = selectedRows;
    if (selectedRows.includes(categ.id)) {
      setSelectedRows([...tempRows.filter((r) => r !== categ.id)]);
    } else {
      tempRows.push(categ.id);
      setSelectedRows([...tempRows]);
    }
  };

  const handleCloseProductModal = () => {
    refreshData();
    setIsProductOpen(false);
    setIsProductDeleteOpen(false);
  };

  const handleCloseCategoryModal = () => {
    refreshData();
    setIsCategoryOpen(false);
    setIsCategoryDeleteOpen(false);
  };

  const handleOpenCategoryModal = (category) => {
    setCategory(category);
    setIsCategoryOpen(true);
  };

  const handleOpenProductModal = (product) => {
    setProduct(product);
    setIsProductOpen(true);
  };

  const handleOpenProductDeleteModal = (product) => {
    setProduct(product);
    setIsProductDeleteOpen(true);
  };

  const handleOpenCategoryDeleteModal = (category) => {
    setCategory(category);
    setIsCategoryDeleteOpen(true);
  };

  const handleNewCategoryModal = () => {
    setCategory(null);
    setIsCategoryOpen(true);
  };

  const handleNewProductModal = () => {
    setProduct(null);
    setIsProductOpen(true);
  };

  const refreshData = async () => {
    try {
      const categResponse = await fetch(url + "/api/menu/" + menu + "/categories/");
      const categories = await categResponse.json();
      const response = await fetch(url + "/api/menu/" + menu + "/items/");
      const jsonData = await response.json();
      const food = jsonData.food;
      var items = [];
      var categ = Object.keys(food);
      const drinks = jsonData.drinks;
      Object.keys(drinks).map((drink) => {
        categ.push(drink);
      });
      categ.map((category) => {
        if (food[category])
          food[category].map((item) => {
            item.category = categories.find((c) => c.id === item.category);
            items.push(item);
          });
        if (drinks[category])
          drinks[category].map((item) => {
            item.category = categories.find((c) => c.id === item.category);
            items.push(item);
          });
      });
      setCategories(categories.sort((a, b) => b.isFood - a.isFood));
      setProducts(items);
      if (selectedRows.length == 0) {
        setFilteredProducts(items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsProductLoading(false);
      setIsCategoryLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      let fp = products.filter((p) => selectedRows.includes(p.category.id));
      setFilteredProducts(fp);
    } else setFilteredProducts(products);
  }, [selectedRows]);

  useEffect(() => {
    refreshData();
  }, []);

  const tableContainer = {
    borderRadius: "20px",
    BorderColor: "black",
    border: "5px solid grey",
    margin: "0 0 20px 0",
    padding: "10px",
    minHeight: "73svh",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={15}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  Meniu
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                sx={{ justifyContent: "space-evenly", display: "flex", flexDirection: "row" }}
              >
                <div style={{ ...tableContainer, width: "40%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", padding: "0 5px" }}
                  >
                    <Typography variant="h4" style={{ padding: "10px 0 0 10px" }}>
                      Categorii
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{ padding: "0" }}
                      color="primary"
                      onClick={handleNewCategoryModal}
                    >
                      <AddCircleRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Select", accessor: "selected", width: "20%" },
                        { Header: "Nume", accessor: "name", width: "45%" },
                        { Header: "Ordine", accessor: "order", width: "20%" },
                        { Header: "Tip", accessor: "isFood", width: "15%" },
                        {
                          Header: "Action",
                          accessor: "action",
                          align: "center",
                          width: "20%",
                        },
                      ],
                      rows: categories.map((category) =>
                        categoryRow(
                          category,
                          handleOpenCategoryModal,
                          handleOpenCategoryDeleteModal,
                          handleCheckboxChange
                        )
                      ),
                    }}
                  />
                  {isCategoryLoading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
                <div style={{ ...tableContainer, width: "55%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", padding: "0 5px" }}
                  >
                    <Typography variant="h4" style={{ padding: "10px 0 0 10px" }}>
                      Produse
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{ padding: "0" }}
                      color="primary"
                      onClick={handleNewProductModal}
                    >
                      <AddCircleRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <DataTable
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch={false}
                    table={{
                      columns: [
                        { Header: "Nume", accessor: "name", width: "25%" },
                        { Header: "Categorie", accessor: "category", width: "15%" },
                        { Header: "Ordine", accessor: "order", width: "10%" },
                        { Header: "Activ", accessor: "active", width: "10%" },
                        { Header: "Pret", accessor: "price", width: "15%" },
                        { Header: "Action", accessor: "action", align: "center", width: "10%" },
                      ],
                      rows: filteredProducts.map((item) =>
                        productRow(item, handleOpenProductModal, handleOpenProductDeleteModal)
                      ),
                    }}
                  />
                  {isProductLoading && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "30px 5px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {isProductOpen && (
        <ProductModal
          open={isProductOpen}
          handleClose={handleCloseProductModal}
          item={product}
          categories={categories}
        />
      )}
      {isProductDeleteOpen && (
        <DeleteModal
          open={isProductDeleteOpen}
          handleClose={handleCloseProductModal}
          item={product}
          type="item"
        />
      )}
      {isCategoryOpen && (
        <CategoryModal
          open={isCategoryOpen}
          handleClose={handleCloseCategoryModal}
          category={category}
        />
      )}
      {isCategoryDeleteOpen && (
        <DeleteModal
          open={isCategoryDeleteOpen}
          handleClose={handleCloseCategoryModal}
          item={category}
          type="category"
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}

function productRow(item, handleOpenModal, handleDeleteModal) {
  return {
    name: item.name,
    category: item.category.name,
    price: item.price,
    order: item.order,
    active: item.isAvailable ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    vegan: item.isVegan ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    dairy_free: item.isDairyFree ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    gluten_free: item.isGlutenFree ? (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="success">
          check
        </Icon>
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <Icon fontSize="small" color="error">
          close
        </Icon>
      </MDBox>
    ),
    action: (
      <MDBox sx={{ maxWidth: "100%", display: "flex", justifyContent: "space-evenly" }}>
        <Button
          href="#"
          sx={{ px: 1, width: "50%", minWidth: "0px" }}
          onClick={() => handleOpenModal(item)}
        >
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { primary } }) => primary.main,
            }}
          >
            edit
          </Icon>
        </Button>
        <Button
          href="#"
          sx={{ px: 1, width: "50%", minWidth: "0px" }}
          onClick={() => handleDeleteModal(item)}
        >
          <Icon
            href="#"
            sx={{
              fontWeight: "bold",
              color: ({ palette: { error } }) => error.main,
            }}
          >
            delete
          </Icon>
        </Button>
      </MDBox>
    ),
  };
}

function categoryRow(category, handleOpenModal, handleDeleteModal, handleCheckboxChange) {
  return {
    selected: (
      <Checkbox
        defaultChecked={false}
        onChange={() => handleCheckboxChange(category)}
        color="primary"
        inputProps={{ "aria-label": "checkbox" }}
      />
    ),
    name: category.name,
    totalItems: category.totalItems,
    order: category.order,
    isFood: category.isFood ? (
      <MDBox display="flex" alignItems="center">
        <RestaurantIcon fontSize="medium" />
      </MDBox>
    ) : (
      <MDBox display="flex" alignItems="center">
        <LocalBarIcon fontSize="medium" />
      </MDBox>
    ),
    action: (
      <MDBox sx={{ maxWidth: "100%", display: "flex", justifyContent: "space-evenly" }}>
        <Button
          href="#"
          sx={{ px: 1, width: "50%", minWidth: "0px" }}
          onClick={() => handleOpenModal(category)}
        >
          <Icon
            sx={{
              fontWeight: "bold",
              color: ({ palette: { primary } }) => primary.main,
            }}
          >
            edit
          </Icon>
        </Button>
        <Button
          href="#"
          sx={{ px: 1, width: "50%", minWidth: "0px" }}
          onClick={() => handleDeleteModal(category)}
        >
          <Icon
            href="#"
            sx={{
              fontWeight: "bold",
              color: ({ palette: { error } }) => error.main,
            }}
          >
            delete
          </Icon>
        </Button>
      </MDBox>
    ),
  };
}

export default Products;
