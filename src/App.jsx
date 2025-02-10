import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
////////////////////////////Admin side components/////////////////////////////
import AdminLoginPage from "./components/AdminLoginPage";
import { Dashboard } from "./components/Dashboard";
import Layout from "./components/Layout";
import AdminDashboardDoctor from "./components/AdminDashboardDoctor";
import Billing from "./components/Billing";
import PatientRecords from "./components/PatientRecords";
import PharmacyMangement from "./components/PharmacyMangement";
import Setting from "./components/Setting";
import CreateDoctorAcc from "./components/CreateDoctorAcc";
import AdminLabResults from "./components/AdminLabResult"
///////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////user side components/////////////////////////////////////////////////////
import CustomLoginPage from "./components/CustomLoginPage";
import UserDashboardOverview from "./components/UserDashboardOverview";
import { UserLayout } from "./components/UserLayout";
import LabResults from "./components/LabResults";
import PreviousConsultations from "./components/PreviousConsultations";
import NewBooking from "./components/NewBooking";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import DrLogin from "./components/DrLogin";
import DoctorConsultations from "./components/DoctorConsultations";
import DrDashboard from "./components/DrDashboard";
import DrLabresult from "./components/DrLabresult";
import DrProfile from "./components/DrProfile";

import CreatePatientAcc from "./components/CreatePatientAcc";
import FireExtinguisher from "./components/FireExtinguisher";
function App() {
  /////////////// for create doctor account component//////////////////
  const [doctors, setDoctors] = useState([]);

  const [patients, setPatients] = useState([]);

  const addDoctor = (newDoctor) => {
    console.log("Adding doctor:", newDoctor);
    setDoctors([...doctors, newDoctor]);
  };

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="doctorlogin" element={<DrLogin></DrLogin>}></Route>
          <Route
            path="drdashboard"
            element={<DrDashboard></DrDashboard>}
          ></Route>
          <Route
            path="docconsult"
            element={<DoctorConsultations></DoctorConsultations>}
          ></Route>
          <Route path="drlabresults" element={<DrLabresult />}></Route>

          <Route path="drprofile" element={<DrProfile></DrProfile>}></Route>

          <Route path="logoutdr" element={<DrLogin />}></Route>

          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<UserLayout></UserLayout>}>
            <Route
              path="userdashboard"
              element={<UserDashboardOverview></UserDashboardOverview>}
            ></Route>
            <Route
              path="labresults"
              element={<LabResults></LabResults>}
            ></Route>
            <Route
              path="previousconsultation"
              element={<PreviousConsultations></PreviousConsultations>}
            ></Route>
            <Route path="book" element={<NewBooking></NewBooking>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
          </Route>
          <Route
            path="userLogin"
            element={<CustomLoginPage></CustomLoginPage>}
          ></Route>
          <Route
            path="adminLogin"
            element={<AdminLoginPage></AdminLoginPage>}
          ></Route>
          <Route path="/" element={<Layout></Layout>}>
            <Route path="adminDashboard" element={<Dashboard></Dashboard>} />
            <Route
              path="AdminDashboardDoctor"
              element={<AdminDashboardDoctor doctors={doctors} />}
            />
            <Route
              path="AdminDashboardDoctor/CreateDoctorAcc"
              element={<CreateDoctorAcc addDoctor={addDoctor} />}
            />

            <Route path="billing" element={<Billing></Billing>} />
            <Route
              path="adminDashboardPatientRecord"
              element={<PatientRecords patients={patients}> </PatientRecords>}
            />

            <Route
              path="/PatientRecords/CreatePatientAcc"
              element={<CreatePatientAcc addPatient={addPatient} />} />

            <Route
              path="adminlabresult"
              element={<AdminLabResults></AdminLabResults>}
            ></Route>



            <Route
              path="pharmacyMangement"
              element={<PharmacyMangement></PharmacyMangement>}
            />
            <Route path="fireextinguishertracker" element={<FireExtinguisher></FireExtinguisher>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

/*
      <LoginPage />
      <Signup />
      <LabResults />
      <Profile />
      <UserDashboardOverview />
      <PreviousConsultations />
      <NewBooking/>

*/
