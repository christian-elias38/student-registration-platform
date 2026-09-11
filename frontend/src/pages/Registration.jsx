import React, { useState, useEffect } from "react";
import { getStudents } from "../services/api";
import { useToast } from "../context/ToastContext";
import { ClipboardList, CheckCircle2, User, BookOpen, AlertCircle } from "lucide-react";

function Registration() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(() => {});
  }, []);

  const availableCourses = [
    { id: 1, code: "CS101", title: "Introduction to Computer Programming", dept: "Computer Science", credits: 3 },
    { id: 2, code: "CS201", title: "Data Structures & Algorithm Analysis", dept: "Computer Science", credits: 4 },
    { id: 3, code: "EE101", title: "Circuit Theory & Network Analysis", dept: "Electrical Engineering", credits: 4 },
    { id: 4, code: "BA101", title: "Principles of Organizational Management", dept: "Business Administration", credits: 3 },
    { id: 5, code: "SE301", title: "Software Architecture & System Design", dept: "Software Engineering", credits: 4 },
    { id: 6, code: "MATH102", title: "Discrete Mathematics & Logic", dept: "Computer Science", credits: 3 },
  ];

  const handleToggleCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const selectedStudent = students.find((s) => String(s.id) === String(selectedStudentId));

  const totalCredits = availableCourses
    .filter((c) => selectedCourses.includes(c.id))
    .reduce((sum, c) => sum + c.credits, 0);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      addToast("Please select a student first", "error");
      return;
    }
    if (selectedCourses.length === 0) {
      addToast("Please select at least one course to register", "error");
      return;
    }

    addToast(`Successfully registered ${selectedStudent?.full_name} for ${selectedCourses.length} courses!`, "success");
    setSelectedStudentId("");
    setSelectedCourses([]);
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Course Registration</h1>
          <p className="page-subtitle">Enroll registered students in active semester course units.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="card">
          <form onSubmit={handleRegister}>
            {/* Step 1: Select Student */}
            <div style={{ marginBottom: 24 }}>
              <label className="form-label" style={{ fontSize: 14, marginBottom: 8 }}>
                1. Select Enrolled Student <span className="required-star">*</span>
              </label>
              <select
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">-- Select Student from Directory --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.student_id}) - {s.department || "General"}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Course Checklist */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <label className="form-label" style={{ fontSize: 14 }}>
                  2. Select Available Courses
                </label>
                <span className="badge badge-plum">Total: {totalCredits} Credit Hours</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {availableCourses.map((c) => {
                  const isChecked = selectedCourses.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => handleToggleCourse(c.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        border: "1.5px solid",
                        borderColor: isChecked ? "var(--terracotta)" : "var(--border)",
                        background: isChecked ? "var(--terracotta-light)" : "var(--surface)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by div click
                          style={{ width: 16, height: 16, accentColor: "var(--terracotta)" }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</div>
                          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                            {c.code} • {c.dept}
                          </span>
                        </div>
                      </div>

                      <span className="badge badge-sage">{c.credits} Cr.</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-terracotta"
              style={{ width: "100%", marginTop: 24, padding: 12, fontSize: 14 }}
            >
              <CheckCircle2 style={{ width: 18, height: 18 }} />
              <span>Confirm Course Registration</span>
            </button>
          </form>
        </div>

        {/* Sidebar Summary Card */}
        <div>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 16 }}>
              Enrollment Summary
            </h3>

            {selectedStudent ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    padding: 12,
                    background: "var(--surface-alt)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Selected Student
                  </span>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{selectedStudent.full_name}</div>
                  <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>{selectedStudent.student_id}</span>
                </div>

                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>
                    Selected Units ({selectedCourses.length})
                  </span>
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                    {selectedCourses.length === 0 ? (
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>No courses selected yet.</span>
                    ) : (
                      availableCourses
                        .filter((c) => selectedCourses.includes(c.id))
                        .map((c) => (
                          <div
                            key={c.id}
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              display: "flex",
                              justify: "space-between",
                            }}
                          >
                            <span>{c.code}</span>
                            <span style={{ color: "var(--text-muted)" }}>{c.credits} Cr.</span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-muted)", fontSize: 13 }}>
                <AlertCircle style={{ width: 28, height: 28, opacity: 0.5, marginBottom: 8 }} />
                <p>Select a student to review enrollment summary.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
