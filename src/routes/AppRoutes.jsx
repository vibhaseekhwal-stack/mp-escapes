import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

import Destinations from "../pages/Destinations/Destinations.jsx";
import AddDestination from "../pages/Destinations/AddDestination.jsx";
import EditDestination from "../pages/Destinations/EditDestination.jsx";
import ViewDestination from "../pages/Destinations/ViewDestination.jsx";

import Itineraries from "../pages/Itineraries/Itineraries.jsx";
import AddItinerary from "../pages/Itineraries/AddItinerary.jsx";
import EditItinerary from "../pages/Itineraries/EditItinerary.jsx";
import ViewItinerary from "../pages/Itineraries/ViewItinerary.jsx";

import Resources from "../pages/Resources/Resources.jsx";
import AddResource from "../pages/Resources/AddResource.jsx";
import EditResource from "../pages/Resources/EditResource.jsx";
import ViewResource from "../pages/Resources/ViewResource.jsx";

import Gallery from "../pages/Gallery/Gallery.jsx";
import UploadMedia from "../pages/Gallery/UploadMedia.jsx";
import ViewMedia from "../pages/Gallery/ViewMedia.jsx";

import TravelInfo from "../pages/TravelInfo/TravelInfo.jsx";
import EditTravelInfo from "../pages/TravelInfo/EditTravelInfo.jsx";

import Contact from "../pages/Contact/Contact.jsx";
import EditContact from "../pages/Contact/EditContact.jsx";

import Analytics from "../pages/Analytics/Analytics.jsx";

import QRManagement from "../pages/QRManagement/QRManagement.jsx";
import QRPreview from "../pages/QRManagement/QRPreview.jsx";

import AdminUsers from "../pages/AdminUsers/AdminUsers.jsx";
import AddAdmin from "../pages/AdminUsers/AddAdmin.jsx";
import EditAdmin from "../pages/AdminUsers/EditAdmin.jsx";
import ViewAdmin from "../pages/AdminUsers/ViewAdmin.jsx";

import Settings from "../pages/Settings/Settings.jsx";
import Downloads from "../pages/Category/Category.jsx";
import Guidelines from "../pages/Guidelines/Guidelines.jsx";
import Hotels from "../pages/Hotels/Hotels.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/add" element={<AddDestination />} />
        <Route path="/destinations/edit/:id" element={<EditDestination />} />
        <Route path="/destinations/view/:id" element={<ViewDestination />} />

        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/itineraries/add" element={<AddItinerary />} />
        <Route path="/itineraries/edit/:id" element={<EditItinerary />} />
        <Route path="/itineraries/view/:id" element={<ViewItinerary />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/add" element={<AddResource />} />
        <Route path="/resources/edit/:id" element={<EditResource />} />
        <Route path="/resources/view/:id" element={<ViewResource />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/upload" element={<UploadMedia />} />
        <Route path="/gallery/view/:id" element={<ViewMedia />} />

        <Route path="/travel-info" element={<TravelInfo />} />
        <Route path="/travel-info/edit/:section" element={<EditTravelInfo />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/edit" element={<EditContact />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/qr-management" element={<QRManagement />} />
        <Route path="/qr-management/preview/:id" element={<QRPreview />} />

        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-users/add" element={<AddAdmin />} />
        <Route path="/admin-users/edit/:id" element={<EditAdmin />} />
        <Route path="/admin-users/view/:id" element={<ViewAdmin />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/categories" element={<Downloads />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/hotels" element={<Hotels />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
