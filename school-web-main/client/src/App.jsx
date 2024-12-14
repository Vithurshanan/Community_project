import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import ScrollToTop from "./components/layouts/Common/ScrollToTop";
import PageLoader from "./components/layouts/PageLoader";
import Profile from "./pages/Profile/Profile";
import GalleryImagesPage from "./components/GalleryComponents/GalleryLayouts/GalleryImagesPage";
import AdminUsers from "./pages/AdminPanel/AdminUsers";
import AdmissionQueriesAdmin from "./AdminPages/AdmissionQueriesAdmin";
import HomeEnrollmentsAdmin from "./AdminPages/HomeEnrollmentsAdmin";
import ParentsEnrollmentsAdmin from "./AdminPages/ParentsEnrollmentsAdmin";
import AdminPayments from "./AdminPages/AdminPayments";
import Statistics from "./AdminPages/Statistics";
import CommonLayout from "./components/AdminpanelComponents/AdminLayouts/CommonLayout";
import FilesContainer from "./components/layouts/Common/FilesContainer";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Academics = React.lazy(() => import("./pages/Academics/Academics"));
const Admissions = React.lazy(() => import("./pages/Admissions/Admissions"));
const ContactUs = React.lazy(() => import("./pages/ContactUs/ContactUs"));
const OurTeam = React.lazy(() => import("./pages/Ourteam/OurTeam"));
const Facilities = React.lazy(() => import("./pages/Facilities/Facilities"));
const Login = React.lazy(() => import("./pages/AdminPanel/Login"));
const Register = React.lazy(() => import("./pages/AdminPanel/Register"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel/AdminPanel"));
const TransportPage = React.lazy(() => import("./pages/Facilities/TransportPage"));
const ComputerPage = React.lazy(() => import("./pages/Facilities/ComputerPage"));
const Sports = React.lazy(() => import("./pages/Facilities/Sports"));
const Houses = React.lazy(() => import("./pages/Facilities/Houses"));
const Classroom = React.lazy(() => import("./pages/Facilities/Classroom"));
const ScienceLab = React.lazy(() => import("./pages/Facilities/ScienceLab"));
const Security = React.lazy(() => import("./pages/Facilities/Security"));
const Library = React.lazy(() => import("./pages/Facilities/Library"));
const Music = React.lazy(() => import("./pages/Facilities/Music"));
const Art = React.lazy(() => import("./pages/Facilities/art"));
const ScoutsAndGuide = React.lazy(() => import("./pages/Facilities/ScoutsAndGuide"));
const CbseCurriculum = React.lazy(() => import("./pages/Home/CbseCurriculum"));
const HolisticEdu = React.lazy(() => import("./pages/Home/HolisticEdu"));
const Awards = React.lazy(() => import("./pages/Home/Awards"));
const CBSEProg = React.lazy(() => import("./pages/Home/CBSEProg"));
const EarlyProgram = React.lazy(() => import("./pages/Home/EarlyProgram"));
const KnowMore = React.lazy(() => import("./pages/Home/KnowMore"));
const JoinOurTeam = React.lazy(() => import("./pages/Ourteam/JoinOurTeam"));
//const Payment = React.lazy(() => import("./pages/Payment/Payment"));
//const PaymentSuccess = React.lazy(() => import("./pages/Payment/PaymentSuccess"));

const ProtectedRoute = React.lazy(() => import("./components/layouts/ProtectedRoute"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const NotFound = React.lazy(() => import("./components/NotFound"));


const App = () => {

  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<PageLoader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/Career" element={<JoinOurTeam />} />
          <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
         
            <Route element={<ProtectedRoute />}>
            <Route path="/admin-login" element={<Login />} />

            <Route element={<CommonLayout />}>
            <Route path="/admin-users" element={<AdminUsers />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/admission-queries" element={<AdmissionQueriesAdmin />} />
              <Route path="/home-enrollments" element={<HomeEnrollmentsAdmin />} />
              <Route path="/parents-enrollments" element={<ParentsEnrollmentsAdmin />} />
              <Route path="/admin-payments" element={<AdminPayments />} />
              <Route path="/admin-statistics" element={<Statistics />} />
            </Route>
          </Route>
          <Route path="/TransportPage" element={<TransportPage />} />
          <Route path="/ComputerPage" element={<ComputerPage />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/Houses" element={<Houses />} />
          <Route path="/Classroom" element={<Classroom />} />
          <Route path="/ScienceLab" element={<ScienceLab />} />
          <Route path="/Security" element={<Security />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Art" element={<Art />} />
          <Route path="/CbseCurriculum" element={<CbseCurriculum />} />
          <Route path="/HolisticEdu" element={<HolisticEdu />} />
          <Route path="/ScoutsAndGuide" element={<ScoutsAndGuide />} />
          <Route path="/Awards" element={<Awards />} />
          <Route path="/CBSEProg" element={<CBSEProg />} />
          <Route path="/EarlyProgram" element={<EarlyProgram />} />
          <Route path="/FilesContainer" element={<FilesContainer />} />
          <Route path="/KnowMore" element={<KnowMore />} />
          {/** <Route path="/payment" element={<Payment />} /> 
           * <Route path="/paymentSuccess" element={<PaymentSuccess/>} />
           * 
          */} 
          
          <Route path="/profile" element={<Profile/>} />
          <Route path="/reset/password/:token" element={<ResetPassword/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/galleryImages/:id" element={<GalleryImagesPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
