import "../css/sidebar.css";
import { NavLink } from "react-router-dom";
function AdminSideBar() {
  return (
    <div className="column">
      <aside className="sidebar">
        <div className="welcome">
          <div className="welcome-text">Welcome, Admin</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea65525082471bff655d3b0d8496b3edfa4cb6b342a7d92cb7d32a2bc6e19fc4?apiKey=25b957d3db53419f881a9efe72b830ae&"
            className="profile-pic"
            alt="Profile"
          />
        </div>
        <nav className="nav-menu sidebar-menu">
          <NavLink to="/adminLogin" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/980450139977dc16c80d2f057251fc1d523ae46382f1d0d1dff99af1db418be7?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Log out</span>
          </NavLink>
          <NavLink to="/adminDashboard" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8928b13283ad38b10e99f0893054230221230ee827735a0b245d6732fb8723f?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/AdminDashboardDoctor" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/58b35b5df0eb2240094966c42c715bb85a9b72b0f9788037bb77b64ab94b46fd?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Doctors</span>
          </NavLink>
          <NavLink to="/adminDashboardPatientRecord" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/12fc3aa3c95fd904a24a76ea5f74f5533b001894b48bc995ba6dfc12aa5f59ae?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Patient Records</span>
          </NavLink>
          <NavLink to="/pharmacyMangement" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/267194040428993b2cdcd4e49cc15234e19b8844f33f4687afb8b0bd44ea685e?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Pharmacy</span>
          </NavLink>
          <NavLink to="/billing" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4351a0f25c313d8f8b7e17955c1f44087081b2641a3ed230e7ae521dfa34c529?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Billing</span>
          </NavLink>
          <NavLink to="/adminlabresult" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/267194040428993b2cdcd4e49cc15234e19b8844f33f4687afb8b0bd44ea685e?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>Lab Results</span>
          </NavLink>
          <NavLink to="/fireextinguishertracker" className="nav-link">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd0d4d6462b786c63660a0324fe8b68d2ba8d83527976c2aee3a87424bfc3aa0?apiKey=25b957d3db53419f881a9efe72b830ae&"
              className="icon"
              alt="Icon"
            />
            <span>FireExt Tracker</span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

export default AdminSideBar;
