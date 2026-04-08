export const STAFF_ROLES = [
  "super_admin",
  "admin",
  "documentation_executive",
  "support_executive",
  "destination_specialist",
  "adviser",
  "support",
];

export const ROLE_GROUPS = {
  allStaff: STAFF_ROLES,
  operations: ["super_admin", "admin", "documentation_executive", "support_executive", "destination_specialist"],
  finance: ["super_admin", "admin"],
  compliance: ["super_admin", "admin", "support_executive"],
};
