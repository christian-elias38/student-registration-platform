import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  ClipboardList,
  BarChart3,
  Bell,
  Settings,
  GraduationCap,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Students", path: "/students", icon: Users },
    { label: "Departments", path: "/departments", icon: Building2 },
    { label: "Courses", path: "/courses", icon: BookOpen },
    { label: "Registrations", path: "/registrations", icon: ClipboardList },
    { label: "Reports", path: "/reports", icon: BarChart3 },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-badge">
          <GraduationCap style={{ width: 22, height: 22 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="brand-name">StudentReg</h2>
          <span className="brand-tag">Student Platform</span>
        </div>
        <button
          className="mobile-toggle"
          onClick={onClose}
          style={{ display: "none" }} // Controlled via CSS media query
        >
          <X style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
              onClick={onClose}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="user-avatar">SM</div>
          <div className="user-info">
            <h4>Selam Mulu</h4>
            <p>Academic Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
