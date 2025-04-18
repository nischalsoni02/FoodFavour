import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import RecipeGenerator from "@/pages/RecipeGenerator";
import DonateFood from "@/pages/DonateFood";
import Login from "@/pages/Login";
import OurTeam from "@/pages/OurTeam";
import FAQ from "@/pages/FAQ";
import CommunityHub from "@/pages/CommunityHub/CommunityHub";

import ExpiryTrack from "@/components/ExpiryTrack";
import ItemDetail from "@/components/ExpiryTrack/ItemDetail";
import AddItem from "@/components/ExpiryTrack/Additem";
import ContactUs from "@/components/ContactUs";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/donate-food" element={<DonateFood />} />
        <Route path="/login" element={<Login />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/expiry-track" element={<ExpiryTrack />} />
        <Route path="/expiry-track/add-item" element={<AddItem />} />
        <Route path="/expiry-track/:id" element={<ItemDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
