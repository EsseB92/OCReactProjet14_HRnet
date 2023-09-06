import DataTable from "react-data-table-component";
import React, { useCallback } from "react";

export const Table = ({ columns, data, setSelectedRows }) => {
  const handleRowSelected = useCallback(
    (state) => {
      setSelectedRows(state.selectedRows);
    },
    [setSelectedRows]
  );

  return (
    <DataTable
      highlightOnHover
      selectableRowsHighlight
      columns={columns}
      data={data}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      pagination
    />
  );
};

export default Table;
