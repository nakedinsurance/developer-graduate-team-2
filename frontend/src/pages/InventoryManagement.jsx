import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Delete, Add, Refresh } from '@mui/icons-material';

const InventoryManagement = () => {
  const [allProducts, setAllProducts] = useState([]); // State to hold all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
  });
  const [inventoryReport, setInventoryReport] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  // Fetch all products once
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setAllProducts(data); // Store all products
      setFilteredProducts(data); // Set filtered products initially to all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch inventory report
  const fetchInventoryReport = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory-report');
      const data = await response.json();
      setInventoryReport(data);
    } catch (error) {
      console.error('Error fetching inventory report:', error);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
    fetchInventoryReport();
  }, []);

  // Effect to filter products based on filters
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const meetsCategory = filters.category ? product.category === filters.category : true;
      const meetsMinPrice = filters.minPrice ? product.price >= Number(filters.minPrice) : true;
      const meetsMaxPrice = filters.maxPrice ? product.price <= Number(filters.maxPrice) : true;

      return meetsCategory && meetsMinPrice && meetsMaxPrice;
    });
    setFilteredProducts(filtered); // Update filtered products
  }, [filters, allProducts]);

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      fetchAllProducts(); // Re-fetch all products after deletion
      fetchInventoryReport();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle product update
  const handleUpdate = async (product) => {
    try {
      await fetch(`http://localhost:3000/api/products/${product.productid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      setEditingProduct(null);
      fetchAllProducts(); // Re-fetch all products after update
      fetchInventoryReport();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle adding new product
  const handleAdd = async () => {
    try {
      await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
      });
      fetchAllProducts(); // Re-fetch all products after adding
      fetchInventoryReport();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Summary Cards */}
      {inventoryReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader title="Total Products" />
            <CardContent>
              <Typography variant="h4">{inventoryReport.totalProducts}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Total Stock Value" />
            <CardContent>
              <Typography variant="h4">R{inventoryReport.totalStockValue?.toFixed(2)}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Low Stock Items" />
            <CardContent>
              <Typography variant="h4">{inventoryReport.lowStockProducts?.length}</Typography>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader title="Filters" />
        <CardContent className="flex gap-4">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.category}>
                  {cat.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Price"
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            fullWidth
          />
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader
          title="Products"
          action={
            <Button onClick={fetchAllProducts} startIcon={<Refresh />}>
              Refresh
            </Button>
          }
        />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-left font-medium">Category</th>
                  <th className="p-4 text-left font-medium">Price</th>
                  <th className="p-4 text-left font-medium">Stock</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Add New Product Row */}
                <tr className="border-b">
                  <td className="p-4">
                    <TextField
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      placeholder="Name"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      placeholder="Category"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: e.target.value,
                        })
                      }
                      placeholder="Price"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          stock: e.target.value,
                        })
                      }
                      placeholder="Stock"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <Button onClick={handleAdd} startIcon={<Add />}>
                      Add
                    </Button>
                  </td>
                </tr>
                {/* List of Products */}
                {filteredProducts.map((product) => (
                  <tr key={product.productid} className="border-b">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.description}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">R{product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <Button onClick={() => setEditingProduct(product)} startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(product.productid)}
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Product Editing Modal can be added here */}
      {editingProduct && (
        <div>
          {/* Implement your editing modal logic here */}
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;