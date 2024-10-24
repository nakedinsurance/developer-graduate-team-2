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
import { Edit, Delete, Add, Refresh, Save, Cancel } from '@mui/icons-material';

const InventoryManagement = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
  });
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [inventoryReport, setInventoryReport] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // For tracking the product being edited
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:4280/api/products');
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4280/api/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchInventoryReport = async () => {
    try {
      const response = await fetch('http://localhost:4280/api/inventory-report');
      const data = await response.json();
      setInventoryReport(data);
    } catch (error) {
      console.error('Error fetching inventory report:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
    fetchInventoryReport();
  }, []);

  // Filter products based on filters and search term
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const meetsCategory = filters.category ? product.category === filters.category : true;
      const meetsMinPrice = filters.minPrice ? product.price >= Number(filters.minPrice) : true;
      const meetsMaxPrice = filters.maxPrice ? product.price <= Number(filters.maxPrice) : true;
      const meetsSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());

      return meetsCategory && meetsMinPrice && meetsMaxPrice && meetsSearchTerm;
    });
    setFilteredProducts(filtered);
  }, [filters, searchTerm, allProducts]);

  const handleDelete = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      fetchAllProducts();
      fetchInventoryReport();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async (product) => {
    try {
      await fetch(`http://localhost:4280/api/products/${product.productid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      setEditingProduct(null); // Close editing form after successful update
      fetchAllProducts();
      fetchInventoryReport();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch('http://localhost:4280/api/products', {
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
      fetchAllProducts();
      fetchInventoryReport();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 space-y-4">
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

      <Card>
        <CardHeader title="Filters & Search" />
        <CardContent className="flex gap-4">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            fullWidth
          />
          <TextField
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            fullWidth
          />
          <TextField
            label="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or description"
            fullWidth
          />
        </CardContent>
      </Card>

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
                <tr className="border-b">
                  <td className="p-4">
                    <TextField
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Name"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Description"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="Category"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Price"
                      fullWidth
                    />
                  </td>
                  <td className="p-4">
                    <TextField
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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

                {filteredProducts.map((product) => (
                  <React.Fragment key={product.productid}>
                    {editingProduct?.productid === product.productid ? (
                      <tr className="border-b">
                        <td className="p-4">
                          <TextField
                            value={editingProduct.name}
                            name="name"
                            onChange={handleEditChange}
                            fullWidth
                          />
                        </td>
                        <td className="p-4">
                          <TextField
                            value={editingProduct.description}
                            name="description"
                            onChange={handleEditChange}
                            fullWidth
                          />
                        </td>
                        <td className="p-4">
                          <TextField
                            value={editingProduct.category}
                            name="category"
                            onChange={handleEditChange}
                            fullWidth
                          />
                        </td>
                        <td className="p-4">
                          <TextField
                            type="number"
                            value={editingProduct.price}
                            name="price"
                            onChange={handleEditChange}
                            fullWidth
                          />
                        </td>
                        <td className="p-4">
                          <TextField
                            type="number"
                            value={editingProduct.stock}
                            name="stock"
                            onChange={handleEditChange}
                            fullWidth
                          />
                        </td>
                        <td className="p-4">
                          <Button
                            onClick={() => handleUpdate(editingProduct)}
                            startIcon={<Save />}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingProduct(null)}
                            startIcon={<Cancel />}
                          >
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        className="border-b"
                        style={{ backgroundColor: product.stock <= 3 ? '#ffebeb' : 'transparent' }}
                      >
                        <td className="p-4">{product.name}</td>
                        <td className="p-4">{product.description}</td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">R{product.price?.toFixed(2)}</td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4">
                          <Button
                            onClick={() => setEditingProduct(product)}
                            startIcon={<Edit />}
                          >
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
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;