// src/components/Planning.tsx

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { ClientSideRowModelModule } from 'ag-grid-community';
// import { ModuleRegistry } from 'ag-grid-community';
// import { RootState, AppDispatch } from '../redux/store';
// import { fetchPlanningData, updateSalesUnits, PlanningRow } from '../redux/planningSlice';
// import { ColDef, ColGroupDef } from 'ag-grid-community';

// ModuleRegistry.registerModules([ClientSideRowModelModule]);



// const Planning: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { rows, loading, error } = useSelector((state: RootState) => state.planning);

//   useEffect(() => {
//     dispatch(fetchPlanningData());
//   }, [dispatch]);

//   const handleCellValueChange = (params: any) => {
//     if (params.node && params.data) {
//       const updatedSalesUnits = parseInt(params.newValue, 10) || 0;
//       dispatch(updateSalesUnits({ id: params.data.id, salesUnits: updatedSalesUnits }));
//     }
//   };

//   const columnDefs: (ColDef<PlanningRow> | ColGroupDef<PlanningRow>)[] = [
//     { headerName: 'Store', field: 'store', pinned: 'left', width: 150 },
//     { headerName: 'SKU', field: 'sku', pinned: 'left', width: 150 },
  
//     {
//       headerName: 'Week 01',
//       children: [
//         {
//           headerName: 'Sales Units',
//           field: 'salesUnits',
//           editable: true,
//           onCellValueChanged: (params) => {
//             if (params.node) {
//               const updatedSalesUnits = params.newValue || 0;
//               const salesDollars = updatedSalesUnits * params.data.price;
//               const gmDollars = salesDollars - updatedSalesUnits * params.data.cost;
//               const gmPercentage = salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
          
//               params.node.setData({
//                 ...params.data,
//                 salesUnits: updatedSalesUnits,
//                 salesDollars,
//                 gmDollars,
//                 gmPercentage,
//               });
//             }
//           },
//           width: 130,
//         },
//         {
//           headerName: 'Sales Dollars',
//           field: 'salesDollars',
//           valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
//           width: 130,
//         },
//         {
//           headerName: 'GM Dollars',
//           field: 'gmDollars',
//           valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
//           width: 130,
//         },
//         {
//           headerName: 'GM Percent',
//           field: 'gmPercentage',
//           valueFormatter: (params) => `${params.value.toFixed(2)}%`,
//           cellStyle: (params) => {
//             const value = params.value;
//             if (value >= 40) return { backgroundColor: 'green', color: 'white' };
//             if (value >= 10) return { backgroundColor: 'yellow', color: 'black' };
//             if (value > 5) return { backgroundColor: 'orange', color: 'white' };
//             return { backgroundColor: 'red', color: 'white' };
//           },
//           width: 130,
//         },
//       ],
//     },
//   ];

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
//       <AgGridReact rowData={rows} columnDefs={columnDefs} domLayout="autoHeight" />
//     </div>
//   );
// };

// export default Planning;



// src/components/Planning.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPlanningData, updateSalesUnits, PlanningRow } from '../redux/planningSlice';
import { ColDef, ColGroupDef } from 'ag-grid-community';


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Planning: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { rows, loading, error } = useSelector((state: RootState) => state.planning);

  useEffect(() => {
    if (!rows.length) {
      dispatch(fetchPlanningData());
    }
  }, [dispatch, rows]);

  const handleCellValueChange = (params: any) => {
    if (params.node && params.data) {
      const updatedSalesUnits = parseInt(params.newValue, 10) || 0;
      dispatch(updateSalesUnits({ id: params.data.id, salesUnits: updatedSalesUnits }));
    }
  };

  const columnDefs: (ColDef<PlanningRow> | ColGroupDef<PlanningRow>)[] = [
    { headerName: 'Store', field: 'store', pinned: 'left', width: 150 },
    { headerName: 'SKU', field: 'sku', pinned: 'left', width: 150 },
  
    {
      headerName: 'Week 01',
      children: [
        {
          headerName: 'Sales Units',
          field: 'salesUnits',
          editable: true,
          onCellValueChanged: (params) => {
            if (params.node) {
              const updatedSalesUnits = params.newValue || 0;
              const salesDollars = updatedSalesUnits * params.data.price;
              const gmDollars = salesDollars - updatedSalesUnits * params.data.cost;
              const gmPercentage = salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
          
              params.node.setData({
                ...params.data,
                salesUnits: updatedSalesUnits,
                salesDollars,
                gmDollars,
                gmPercentage,
              });
            }
          },
          width: 130,
        },
        {
          headerName: 'Sales Dollars',
          field: 'salesDollars',
          valueFormatter: (params) => {
            const value = params?.value;
            return value != null ? `$ ${Number(value).toFixed(2)}` : '$ 0.00';
          },
          width: 130,
        },
        {
          headerName: 'GM Dollars',
          field: 'gmDollars',
          valueFormatter: (params) => {
            const value = params?.value;
            return value != null ? `$ ${Number(value).toFixed(2)}` : '$ 0.00';
          },
          width: 130,
        },
        {
          headerName: 'GM Percent',
          field: 'gmPercentage',
          valueFormatter: (params) => {
            const value = params?.value;
            return value != null ? `$ ${Number(value).toFixed(2)}` : '$ 0.00';
          },
          cellStyle: (params) => {
            const value = params.value;
            if (value >= 40) return { backgroundColor: 'green', color: 'white' };
            if (value >= 10) return { backgroundColor: 'yellow', color: 'black' };
            if (value > 5) return { backgroundColor: 'orange', color: 'white' };
            return { backgroundColor: 'red', color: 'white' };
          },
          width: 130,
        },
      ],
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rows}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        rowModelType="clientSide"
      />
    </div>
  );
});

export default Planning;