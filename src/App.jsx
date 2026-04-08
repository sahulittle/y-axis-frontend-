import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminBlogPosts from "./admin/pages/AdminBlogPosts";
import AdminConsultations from "./admin/pages/AdminConsultations";
import AdminCountries from "./admin/pages/AdminCountries";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminJobs from "./admin/pages/AdminJobs";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminUsers from "./admin/pages/AdminUsers";
import UserLayout from "./user/UserLayout";
import Home from "./user/pages/Home";
import FreeEligiblityCheck from "./user/pages/FreeEligiblityCheck";
import Migrate from "./user/pages/Migrate";
import Study from "./user/pages/Study";
import Visa from "./user/pages/Visa";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ContactUs from "./user/pages/Contactus";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="consultations" element={<AdminConsultations />} />
          <Route path="countries" element={<AdminCountries />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="blog-posts" element={<AdminBlogPosts />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/free-eligibility-check" element={<FreeEligiblityCheck />} />
          <Route path="/migrate" element={<Migrate />} />
          <Route path="/study" element={<Study />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/contactus" element={<ContactUs />}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;