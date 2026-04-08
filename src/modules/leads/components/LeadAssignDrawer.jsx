import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Drawer from "../../../shared/ui/Drawer";
import Button from "../../../shared/ui/Button";
import { assignLeadSchema } from "../schemas";

const LeadAssignDrawer = ({ open, onClose, lead, staffOptions, onAssign, loading }) => {
  const form = useForm({
    resolver: zodResolver(assignLeadSchema),
    defaultValues: { assignedTo: "" },
  });

  React.useEffect(() => {
    form.reset({ assignedTo: lead?.assignedTo?._id || lead?.assignedTo || "" });
  }, [form, lead]);

  const submit = form.handleSubmit(async (values) => {
    await onAssign(values);
    onClose();
  });

  return (
    <Drawer open={open} onClose={onClose} title="Assign Lead">
      <p className="text-sm text-slate-600">
        Assigning lead: <span className="font-semibold text-slate-900">{lead?.fullName || "-"}</span>
      </p>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Assign to</label>
          {staffOptions.length > 0 ? (
            <select
              {...form.register("assignedTo")}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select staff</option>
              {staffOptions.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.firstName} {staff.lastName} ({staff.email})
                </option>
              ))}
            </select>
          ) : (
            <input
              placeholder="Staff user id"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              {...form.register("assignedTo")}
            />
          )}
          {form.formState.errors.assignedTo ? (
            <p className="mt-1 text-xs text-rose-600">{form.formState.errors.assignedTo.message}</p>
          ) : null}
        </div>

        {staffOptions.length === 0 ? (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Staff list not available from API. You can still paste a valid staff ID.
          </p>
        ) : null}

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Assigning..." : "Assign"}
          </Button>
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default LeadAssignDrawer;
