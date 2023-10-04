import React, { useState, useRef, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import { ProductsData, ProductsGrid } from "../data/dummy";
import { Header, InputModal, Button } from "../components";

const Products = () => {
  const { currentColor } = useStateContext();

  const gridRef = useRef(null);
  const [newProductsData, setNewProductsData] = useState(ProductsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductFullName: "",
    Status: "",
    Items: 0,
    Price: "",
    Location: "",
  });

  const addNewProduct = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (newProduct) => {
    // Assuming you have validation logic here before adding the new Product

    const highestId = Math.max(
      ...newProductsData.map((product) => product.ProductID),
      0
    );
    const newProductID = highestId + 1;

    // Create a new product with the generated ID
    const newProductData = {
      ProductID: newProductID,
      ...newProduct,
    };

    // Update the state with the new product data
    setNewProductsData((prevData) => [newProductData, ...prevData.reverse()]);
    gridRef.current.refresh();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (gridRef.current) {
      const searchInput = document.getElementById(
        gridRef.current.element.id + "_searchbar"
      );
      searchInput.addEventListener("keyup", (event) => {
        gridRef.current.search(event.target.value);
      });
    }
  }, []);

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Products" />
      <div className="mb-1" onClick={addNewProduct}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Add New Product"
          borderRadius="10px"
        />
      </div>

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      <GridComponent
        dataSource={newProductsData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={{ persistSelection: true }}
        toolbar={["Delete", "Edit", "Search"]}
        allowSorting
        editSettings={editing}
        ref={gridRef}
        created={() => {}}
      >
        <ColumnsDirective>
          {ProductsGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              {...item}
              allowSearching={item.field === "ProductName"}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Products;
