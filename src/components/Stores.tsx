// src/components/Store.tsx
import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addStore, removeStore, updateStore, reorderStores , fetchStores } from '../redux/storesSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Stores.css';



const Store: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newStore, setNewStore] = useState({ Label: '', City: '', State: '' });
  const { stores, loading, error } = useSelector((state: RootState) => state.stores);


  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  console.log(stores)

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p>Error: {error}</p>;


  const handleAddStore = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newSeqNo = stores.length + 1;
    dispatch(addStore({ ...newStore, id: newId, 'Seq No.': newSeqNo }));
    setNewStore({ Label: '', City: '', State: '' });
  };

  const handleRemoveStore = (id: string) => {
    dispatch(removeStore(id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(stores);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderStores(items));
  };

  return (
    <div className="store-container">
      <h1>Store List</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stores">
          {(provided) => (
            <table {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Store</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <Draggable key={store.id} draggableId={store.id} index={index}>
                    {(provided) => (
                      <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <td>{store['Seq No.']}</td>
                        <td>{store.Label}</td>
                        <td>{store.City}</td>
                        <td>{store.State}</td>
                        <td>
                          <button onClick={() => handleRemoveStore(store.id)}>🗑️</button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      <div className="add-store">
        <input 
          type="text" 
          placeholder="Store Name" 
          value={newStore.Label} 
          onChange={(e) => setNewStore({ ...newStore, Label: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="City" 
          value={newStore.City} 
          onChange={(e) => setNewStore({ ...newStore, City: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="State" 
          value={newStore.State} 
          onChange={(e) => setNewStore({ ...newStore, State: e.target.value })} 
        />
        <button onClick={handleAddStore}>NEW STORE</button>
      </div>
    </div>
  );
};

export default Store;