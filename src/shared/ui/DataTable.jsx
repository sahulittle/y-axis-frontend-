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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="hidden overflow-x-auto md:block">
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

      <div className="space-y-3 p-3 md:hidden">
        {loading ? <p className="text-sm text-slate-500">Loading records...</p> : null}

        {!loading && rows.length === 0 ? (
          <p className="text-sm text-slate-500">No records found for current filters.</p>
        ) : null}

        {!loading
          ? rows.map((row) => (
              <article key={row.id || row._id} className="rounded-xl border border-slate-200 p-3">
                <div className="space-y-3">
                  {columns.map((column) => (
                    <div key={column.key}>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{column.label}</p>
                      <div className="mt-1 text-sm text-slate-700">{column.render ? column.render(row) : row[column.key]}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))
          : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Page {page} of {Math.max(totalPages, 1)}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <Button size="sm" className="w-full sm:w-auto" variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-full sm:w-auto"
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
