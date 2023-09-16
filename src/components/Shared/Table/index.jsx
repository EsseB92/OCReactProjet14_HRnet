import DataTable from "react-data-table-component";
import React, { useCallback } from "react";

const Table = ({ columns, data, setSelectedRows }) => {
  const handleRowSelected = useCallback(
    (state) => {
      setSelectedRows(state.selectedRows);
    },
    [setSelectedRows]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      highlightOnHover
      onSelectedRowsChange={handleRowSelected}
      selectableRows
      selectableRowsHighlight
      pagination
      responsive
    />
  );
};

export default Table;
