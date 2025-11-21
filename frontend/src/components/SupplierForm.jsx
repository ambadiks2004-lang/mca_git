import { useState } from 'react';
import axios from 'axios';

export default function SupplierForm({ fetchSuppliers }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('present');
  const [type, setType] = useState('Grocery');

  const handleSubmit = async (e) => {
    e.preventDefault();  // important
    console.log('Form submitted'); // debug

    try {
      const res = await axios.post('http://localhost:5000/api/suppliers', { name, contact, category });
      console.log('Supplier added:', res.data); // debug
      setName('');
      setContact('');
      setCategory('present');
      fetchSuppliers(); // refresh list
    } catch (err) {
      console.error('Error adding supplier:', err.response || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        required
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
  );
}
