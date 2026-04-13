import React from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

const ArrayRepeater = ({
  label,
  description,
  items = [],
  createItem,
  onChange,
  renderItem,
  addLabel = "Add",
}) => {
  const handleAdd = () => {
    onChange([...(items || []), createItem()]);
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) {
      return;
    }

    const nextItems = [...items];
    const [current] = nextItems.splice(index, 1);
    nextItems.splice(targetIndex, 0, current);
    onChange(nextItems);
  };

  const handleItemChange = (index, nextValue) => {
    const nextItems = [...items];
    nextItems[index] = nextValue;
    onChange(nextItems);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{label}</h3>
          {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} />
          {addLabel}
        </button>
      </div>

      {items.length === 0 ? <p className="text-sm text-slate-500">No items added.</p> : null}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="rounded-xl border border-slate-200 p-3">
            <div className="flex items-center justify-end gap-1 mb-3">
              <button
                type="button"
                onClick={() => handleMove(index, -1)}
                disabled={index === 0}
                className="rounded-md border border-slate-300 p-1 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                aria-label={`Move ${label} item up`}
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleMove(index, 1)}
                disabled={index === items.length - 1}
                className="rounded-md border border-slate-300 p-1 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                aria-label={`Move ${label} item down`}
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="rounded-md border border-rose-300 p-1 text-rose-600 hover:bg-rose-50"
                aria-label={`Remove ${label} item`}
              >
                <Trash2 size={14} />
              </button>
            </div>

            {renderItem(item, index, (nextValue) => handleItemChange(index, nextValue))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayRepeater;
