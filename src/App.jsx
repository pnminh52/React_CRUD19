import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Add from "./pages/Add";
import Update from "./pages/Update";
import List from "./pages/List";

// Fetch function for getting products
const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

const App = () => {
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Query to fetch products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Mutation to delete a product
  const deleteProduct = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async ({ id }) => {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onDel = (id) => {
    if (confirm("Xoa") === true) {
      deleteProduct.mutate({ id });
    }
  };

  // Mutation to add a new product
  const addProduct = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async ({ newProduct }) => {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("done");
      navigate("/products/list");
    },
  });

  const onAdd = (e) => {
    e.preventDefault();
    addProduct.mutate({ newProduct: inputValue });
  };

  // Mutation to update a product
  const updateProduct = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: async ({ updatedProduct }) => {
      const response = await fetch(
        `http://localhost:3000/products/${updatedProduct.id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("done");
      navigate("/products/list");
    },
  });

  const onUpdate = (product) => {
    updateProduct.mutate({ updatedProduct: product });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products!</div>;

  return (
    <>
      <Routes>
        <Route
          path="/products/list"
          element={<List products={products} onDel={onDel} />}
        />
        <Route
          path="/products/add"
          element={<Add onAdd={onAdd} onChange={onChange} />}
        />
        <Route
          path="/products/:id/update"
          element={<Update products={products} onUpdate={onUpdate} />}
        />
      </Routes>
    </>
  );
};

export default App;
