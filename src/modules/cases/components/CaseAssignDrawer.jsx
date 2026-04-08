import React from "react";
import { useForm } from "react-hook-form";
import Drawer from "../../../shared/ui/Drawer";
import Button from "../../../shared/ui/Button";

const CaseAssignDrawer = ({ open, onClose, caseRecord, staffOptions = [], onAssign, loading }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      assignedStaff: "",
    },
  });

  React.useEffect(() => {
    reset({ assignedStaff: "" });
  }, [open, reset]);

  const submit = handleSubmit(async (values) => {
    if (!values.assignedStaff) {
      return;
    }

    await onAssign({ assignedStaff: [values.assignedStaff] });
    onClose();
  });

  return (
    <Drawer open={open} onClose={onClose} title="Assign Case Staff">
      {caseRecord ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
            <p className="font-medium text-slate-800">{caseRecord.caseId}</p>
            <p className="mt-1 text-xs text-slate-500">{caseRecord.destinationCountry} - {caseRecord.visaCategory}</p>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              {...register("assignedStaff")}
            >
              <option value="">Select staff member</option>
              {staffOptions.map((staff) => (
                <option key={staff.id || staff._id} value={staff.id || staff._id}>
                  {staff.firstName} {staff.lastName} ({staff.role})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Assigning..." : "Assign"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </Drawer>
  );
};

export default CaseAssignDrawer;
