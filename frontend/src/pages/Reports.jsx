import React, { useState, useEffect } from "react";
import { getStudents } from "../services/api";
import { useToast } from "../context/ToastContext";
import { BarChart3, Download, Printer, Users, Building2, BookOpen, Award } from "lucide-react";

function Reports() {
  const [students, setStudents] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(() => {});
  }, []);

  const totalStudents = students.length;

  const handleExportCSV = () => {
    if (students.length === 0) {
      addToast("No data to export", "error");
      return;
    }
    const headers = ["Student ID", "Full Name", "Email", "Department", "Year", "Date Registered"];
    const rows = students.map((s) => [
      s.student_id,
      `"${s.full_name}"`,
      s.email,
      `"${s.department || "General"}"`,
      s.year || "Freshman",
      s.created_at || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_registration_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Student report exported to CSV!", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Reports & Academic Analytics</h1>
          <p className="page-subtitle">Exportable registration metrics and institutional analytics summary.</p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer style={{ width: 16, height: 16 }} />
            <span>Print Report</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportCSV}>
            <Download style={{ width: 16, height: 16 }} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div>
            <span className="stat-label">Total Enrolled</span>
            <div className="stat-value">{totalStudents}</div>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Active academic records</span>
          </div>
          <div className="stat-icon-wrap" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
            <Users style={{ width: 22, height: 22 }} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-label">Departments</span>
            <div className="stat-value">7</div>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Active faculties</span>
          </div>
          <div className="stat-icon-wrap" style={{ background: "var(--terracotta-light)", color: "var(--terracotta)" }}>
            <Building2 style={{ width: 22, height: 22 }} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-label">Average Credits</span>
            <div className="stat-value">14.2</div>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Per registered student</span>
          </div>
          <div className="stat-icon-wrap" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
            <BookOpen style={{ width: 22, height: 22 }} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-label">Retention Rate</span>
            <div className="stat-value">98.4%</div>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Academic standing</span>
          </div>
          <div className="stat-icon-wrap" style={{ background: "var(--amber-light)", color: "var(--amber)" }}>
            <Award style={{ width: 22, height: 22 }} />
          </div>
        </div>
      </div>

      {/* Report Summary Data Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Registration Summary Sheet</h3>
          <span className="badge badge-plum">Official Academic Record</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Department</th>
                <th>Year Level</th>
                <th>Standing</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>
                    No student records to generate report.
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span className="badge badge-plum">{s.student_id}</span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{s.full_name}</td>
                    <td>{s.email}</td>
                    <td>
                      <span className="badge badge-sage">{s.department || "General"}</span>
                    </td>
                    <td>{s.year || "Freshman"}</td>
                    <td>
                      <span className="badge badge-sage">Good Standing</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
