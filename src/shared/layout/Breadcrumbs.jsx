import React from "react";
import { Link, useLocation } from "react-router-dom";

const toLabel = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  if (paths.length <= 1) {
    return null;
  }

  return (
    <nav className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/admin/dashboard" className="hover:text-slate-700">Dashboard</Link>
        </li>
        {paths.slice(1).map((segment, index) => {
          const href = `/${paths.slice(0, index + 2).join("/")}`;
          const last = index === paths.slice(1).length - 1;
          return (
            <React.Fragment key={href}>
              <li>/</li>
              <li>
                {last ? <span className="text-slate-700">{toLabel(segment)}</span> : <Link to={href}>{toLabel(segment)}</Link>}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
