import React, { useState } from "react";
import { BookOpen, Search, Filter, Plus, CheckCircle2 } from "lucide-react";

function Courses() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  const courseCatalog = [
    { code: "CS101", title: "Introduction to Computer Programming", dept: "Computer Science", credits: 3, capacity: "45 / 50", status: "Active" },
    { code: "CS201", title: "Data Structures & Algorithm Analysis", dept: "Computer Science", credits: 4, capacity: "38 / 40", status: "Active" },
    { code: "EE101", title: "Circuit Theory & Network Analysis", dept: "Electrical Engineering", credits: 4, capacity: "42 / 45", status: "Active" },
    { code: "ME102", title: "Thermodynamics & Energy Systems", dept: "Civil Engineering", credits: 3, capacity: "29 / 35", status: "Active" },
    { code: "BA101", title: "Principles of Organizational Management", dept: "Business Administration", credits: 3, capacity: "50 / 50", status: "Full" },
    { code: "SE301", title: "Software Architecture & System Design", dept: "Software Engineering", credits: 4, capacity: "31 / 40", status: "Active" },
    { code: "LAW202", title: "Constitutional & Administrative Law", dept: "Law", credits: 3, capacity: "25 / 30", status: "Active" },
    { code: "MED105", title: "Human Anatomy & Physiology I", dept: "Medicine", credits: 5, capacity: "40 / 40", status: "Full" },
  ];

  const filteredCourses = courseCatalog.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter ? c.dept === deptFilter : true;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Course Catalogue</h1>
          <p className="page-subtitle">Manage curriculum courses, credit values, and enrollment capacities.</p>
        </div>

        <button className="btn btn-primary">
          <Plus style={{ width: 16, height: 16 }} />
          <span>Add Course</span>
        </button>
      </div>

      <div className="card">
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: 280 }}>
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
                placeholder="Search course code or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="form-select"
              style={{ width: 220 }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
            </select>
          </div>

          <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
            Showing {filteredCourses.length} courses
          </div>
        </div>

        {/* Table View */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr key={c.code}>
                  <td>
                    <span className="badge badge-plum">{c.code}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{c.title}</td>
                  <td>
                    <span className="badge badge-sage">{c.dept}</span>
                  </td>
                  <td>{c.credits} Cr.</td>
                  <td>{c.capacity}</td>
                  <td>
                    <span className={`badge ${c.status === "Full" ? "badge-amber" : "badge-sage"}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Courses;
