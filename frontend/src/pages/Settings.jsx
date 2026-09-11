import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { Settings as SettingsIcon, Sun, Moon, Save, User, ShieldCheck } from "lucide-react";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [adminProfile, setAdminProfile] = useState({
    name: "Selam Mulu",
    email: "admin@university.edu",
    role: "System Administrator",
  });

  const [academicDefaults, setAcademicDefaults] = useState({
    term: "2026 Academic Term I",
    idPrefix: "STU-2026-",
    defaultDept: "Computer Science",
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast("System preferences saved successfully!", "success");
  };

  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Platform Settings</h1>
          <p className="page-subtitle">Configure system defaults, admin profile, and interface preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Appearance Settings */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>
            Interface & Theme Appearance
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justify: "space-between",
              padding: "14px 18px",
              background: "var(--surface-alt)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Dark Theme Mode</div>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Currently active: {theme === "dark" ? "Dark Theme" : "Light Warm Academic Theme"}
              </span>
            </div>

            <button type="button" className="btn btn-secondary" onClick={toggleTheme}>
              {theme === "light" ? (
                <>
                  <Moon style={{ width: 16, height: 16 }} />
                  <span>Switch to Dark</span>
                </>
              ) : (
                <>
                  <Sun style={{ width: 16, height: 16 }} />
                  <span>Switch to Light</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Admin Profile Settings */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>
            Administrator Profile
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Admin Name</label>
              <input
                className="form-input"
                value={adminProfile.name}
                onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                value={adminProfile.email}
                onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Academic Platform Defaults */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>
            Academic Platform Defaults
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Active Academic Term</label>
              <input
                className="form-input"
                value={academicDefaults.term}
                onChange={(e) => setAcademicDefaults({ ...academicDefaults, term: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Student ID Prefix Format</label>
              <input
                className="form-input"
                value={academicDefaults.idPrefix}
                onChange={(e) => setAcademicDefaults({ ...academicDefaults, idPrefix: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-terracotta">
            <Save style={{ width: 16, height: 16 }} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
