import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface TableElementProps {
  rows: { id: number, firstName: string | null, lastName: string, age: number | null }[]; // Rows type
  columns: GridColDef[]; // Columns type
  pageSizeOptions?: number[]; // Optional page size options
  initialPaginationModel?: { pageSize: number }; // Optional pagination model
}

const TableElement: React.FC<TableElementProps> = ({
  rows,
  columns,
  pageSizeOptions = [5],
  initialPaginationModel = { pageSize: 5 },
}) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: initialPaginationModel,
          },
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          // Styling column headers
          '& .MuiDataGrid-columnHeader': {
            color: 'grey', // Grey text color
            fontSize: '1rem', // Smaller font size for column headers
          },
          // Styling the rows to alternate every second row with grey background
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#f7f7f7', // Light grey background for every second row
          },
          // Make row text bold
          '& .MuiDataGrid-cell': {
            fontWeight: 'bold', // Bold text for row cells
          },
          '& .MuiDataGrid-cell.Mui-selected': {
            backgroundColor: '#ededff',  // Background Color when  for row cells are Selected
          },
          // Styling selected or focused rows to have blue background
          '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-focused': {
            backgroundColor: '#ededff',  // Blue background for selected/focused rows
          },
          // Optional: Add hover effect to rows (lighten on hover)
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#ededff', // Slightly darker grey on hover
          },

          // Pagination Styling
          // Styling pagination controls to center align them
          '& .MuiTablePagination-root': {
            display: 'flex',
            justifyContent: 'center', // Center the pagination controls
          },
        }}
      />
    </Box>
  );
};

export default TableElement;
