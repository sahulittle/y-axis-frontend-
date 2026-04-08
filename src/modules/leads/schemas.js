import { z } from "zod";

export const updateLeadStageSchema = z.object({
  stage: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
});

export const assignLeadSchema = z.object({
  assignedTo: z.string().min(24, "Select a staff member"),
});

export const leadNoteSchema = z.object({
  note: z.string().min(2, "Note is required").max(2000, "Note is too long"),
});
