import React from 'react';

export default function SupplierList({ suppliers, category, deleteSupplier }) {
  const filteredSuppliers = suppliers.filter(s => s.category === category);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Suppliers</h2>

      {filteredSuppliers.length === 0 ? (
        <p>No suppliers in this category.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Contact</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{s.name}</td>
                <td style={{ padding: '10px' }}>{s.contact}</td>
                <td style={{ padding: '10px' }}>{s.type}</td>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={() => deleteSupplier(s.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
