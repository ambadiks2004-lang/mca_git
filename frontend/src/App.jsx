import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SupplierList from "./components/SupplierList";

function Home({ fetchSuppliers }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('present');
  const [type, setType] = useState('Grocery');

  const addSupplier = async (e) => {
  e.preventDefault();

  // Name required
  if (!name.trim()) {
    alert('Name is required.');
    return;
  }

  // Contact number validation (exactly 10 digits)
  const contactPattern = /^\d{10}$/;
  if (contact && !contactPattern.test(contact)) {
    alert('Contact must be exactly 10 digits.');
    return;
  }

  // Category required
  if (!category) {
    alert('Category must be selected.');
    return;
  }

  try {
    const res = await axios.post(
    'http://localhost:5000/api/suppliers',
    { name, contact, category, type },
    { headers: { 'Content-Type': 'application/json' } }
  );

    alert('Supplier added successfully!');
    setName('');
    setContact('');
    setCategory('present');
    fetchSuppliers();
  } catch (err) {
    console.error('Error adding supplier:', err.response?.data || err.message);
    alert(err.response?.data?.error || 'Error adding supplier! Check console.');
  }
};


  return (
    <div>
      <h1>Add Supplier</h1>
      <form onSubmit={addSupplier}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="Grocery">Grocery</option>
          <option value="Dairy">Dairy</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="past">Past</option>
          <option value="present">Present</option>
          <option value="future">Future</option>
        </select>
        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
}

export default function App() {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
  if (!window.confirm('Are you sure you want to delete this supplier?')) return;

  try {
    await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
    fetchSuppliers();
  } catch (err) {
    console.error(err);
    alert('Error deleting supplier!');
  }
};


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Navbar */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/past" style={{ marginRight: '15px' }}>Past Suppliers</Link>
        <Link to="/present" style={{ marginRight: '15px' }}>Present Suppliers</Link>
        <Link to="/future">Future Suppliers</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home fetchSuppliers={fetchSuppliers} />} />
        <Route
          path="/past"
          element={<SupplierList suppliers={suppliers} category="past" deleteSupplier={deleteSupplier} />}
        />
        <Route
          path="/present"
          element={<SupplierList suppliers={suppliers} category="present" deleteSupplier={deleteSupplier} />}
        />
        <Route
          path="/future"
          element={<SupplierList suppliers={suppliers} category="future" deleteSupplier={deleteSupplier} />}
        />
      </Routes>
    </div>
  );
}
