// src/components/SKUs.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchSKUs, addSKU, updateSKU, deleteSKU } from '../redux/skusSlice';
import './SKUs.css';

interface SKU {
    ID: string;
    Label: string;
    Class: string;
    Department: string;
    Price: number;
    Cost: number;
    id: string;
  }

const SKUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const skus = useSelector((state: RootState) => state.skus.skus);

  const [newSKU, setNewSKU] = useState({ ID:"", Label:"", Class:"",Department:"",Price:"",Cost:"",id:"" });

  useEffect(() => {
    dispatch(fetchSKUs());
  }, [dispatch]);

  const handleAddSKU = () => {
    if (!newSKU.Label || !newSKU.Price || !newSKU.Cost) return;

    const newId = Math.random().toString(36).substr(2, 9);
    const skuData = {
      id: newId,
      ID:newSKU.ID,
      Label: newSKU.Label,
      Class:newSKU.Class,
      Department:newSKU.Department,
      Price: parseFloat(newSKU.Price),
      Cost: parseFloat(newSKU.Cost),
    };

    dispatch(addSKU(skuData));
    setNewSKU({ ID:'', Label: '', Class:'', Department:'', Price: '', Cost: '', id:'' });
  };

  const handleDeleteSKU = (id: string) => {
    dispatch(deleteSKU(id));
  };

  const handleUpdateSKU = (id: string, field: string, value: string) => {
    dispatch(updateSKU({ id, updates: { [field]: value } }));
  };

  console.log(skus)

  return (
    <div className="sku-container">
      <h2>SKU Management</h2>

      <table className="sku-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((sku: SKU) => (
            <tr key={sku.ID}>
              <td>
                {sku.Label}
              </td>
              <td>
                {sku.Price}
              </td>
              <td>
                {sku.Cost}
              </td>
              <td>
                <button onClick={() => handleDeleteSKU(sku.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-sku-form">
        <input
          type="text"
          placeholder="ID"
          value={newSKU.ID}
          onChange={(e) => setNewSKU({ ...newSKU, ID: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          value={newSKU.Class}
          onChange={(e) => setNewSKU({ ...newSKU, Class: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newSKU.Department}
          onChange={(e) => setNewSKU({ ...newSKU, Department: e.target.value })}
        />
        <input
          type="text"
          placeholder="SKU Name"
          value={newSKU.Label}
          onChange={(e) => setNewSKU({ ...newSKU, Label: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newSKU.Price}
          onChange={(e) => setNewSKU({ ...newSKU, Price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newSKU.Cost}
          onChange={(e) => setNewSKU({ ...newSKU, Cost: e.target.value })}
        />
        <button onClick={handleAddSKU}>Add SKU</button>
      </div>
    </div>
  );
};

export default SKUs;