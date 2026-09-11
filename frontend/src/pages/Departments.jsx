import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/api";
import { Building2, Users, BookOpen, Search, ArrowRight, Plus } from "lucide-react";

function Departments() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(() => {});
  }, []);

  const departmentCatalog = [
    { name: "Computer Science", head: "Dr. Alula Haile", courses: 14, icon: "💻" },
    { name: "Electrical Engineering", head: "Prof. Tigist Bekele", courses: 12, icon: "⚡" },
    { name: "Business Administration", head: "Dr. Marcus Vance", courses: 10, icon: "📊" },
    { name: "Software Engineering", head: "Dr. Martha Tadesse", courses: 11, icon: "⚙️" },
    { name: "Civil Engineering", head: "Prof. Dawit Solomon", courses: 9, icon: "🏗️" },
    { name: "Medicine", head: "Dr. Helen Girma", courses: 16, icon: "🩺" },
    { name: "Law", head: "Prof. Yonas Worku", courses: 8, icon: "⚖️" },
  ];

  const getDepartmentStudentCount = (deptName) => {
    return students.filter((s) => s.department === deptName).length;
  };

  const filteredDepts = departmentCatalog.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.head.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Academic Departments</h1>
          <p className="page-subtitle">Overview of faculty programs, active courses, and student distribution.</p>
        </div>

        <div style={{ position: "relative", width: 260 }}>
          <Search
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              width: 16,
              height: 16,
            }}
          />
          <input
            className="form-input"
            style={{ paddingLeft: 36 }}
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Department Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {filteredDepts.map((dept) => {
          const studentCount = getDepartmentStudentCount(dept.name);
          return (
            <div key={dept.name} className="card" style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {dept.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{dept.name}</h3>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Head: {dept.head}</span>
                  </div>
                </div>
                <span className="badge badge-sage">Active</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  padding: "12px 14px",
                  background: "var(--surface-alt)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: 16,
                }}
              >
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Students
                  </span>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)" }}>{studentCount}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Courses
                  </span>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "var(--terracotta)" }}>{dept.courses}</p>
                </div>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => navigate(`/students?dept=${encodeURIComponent(dept.name)}`)}
              >
                <span>View Enrolled Students</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Departments;
