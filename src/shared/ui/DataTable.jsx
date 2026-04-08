import React from "react";
import Button from "./Button";

const DataTable = ({
  columns,
  rows,
  loading,
  page,
  totalPages,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleSort = (column) => {
    if (!column.sortable || !onSortChange) {
      return;
    }

    const nextOrder = sortBy === column.key && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(column.key, nextOrder);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs uppercase tracking-[0.12em] text-slate-500"
                >
                  <button
                    type="button"
                    onClick={() => handleSort(column)}
                    className="inline-flex items-center gap-2"
                  >
                    {column.label}
                    {column.sortable && sortBy === column.key ? (
                      <span className="text-[10px]">{sortOrder === "asc" ? "▲" : "▼"}</span>
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-sm text-slate-500">
                  Loading records...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-sm text-slate-500">
                  No records found for current filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id || row._id} className="border-t border-slate-100">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-slate-700 align-top">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
        <p className="text-xs text-slate-500">
          Page {page} of {Math.max(totalPages, 1)}
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
