import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent } from "../services/api";
import { getInitials, getAvatarColor, formatDate } from "../utils/format";
import {
  ArrowLeft,
  Edit,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  Building2,
  GraduationCap,
  Clock,
  CheckCircle2,
} from "lucide-react";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent(id)
      .then((res) => setStudent(res.data))
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
        Loading student profile...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 40 }}>
        <h3>Student Not Found</h3>
        <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
          The requested student profile could not be located.
        </p>
        <button className="btn btn-secondary" onClick={() => navigate("/students")} style={{ marginTop: 16 }}>
          Back to Student Directory
        </button>
      </div>
    );
  }

  // Mock registered courses for profile display
  const registeredCourses = [
    { code: "CS101", title: "Introduction to Programming", credits: 3, status: "Enrolled" },
    { code: "CS201", title: "Data Structures & Algorithms", credits: 3, status: "Enrolled" },
    { code: "MATH102", title: "Discrete Mathematics", credits: 4, status: "Enrolled" },
  ];

  return (
    <div>
      {/* Page Navigation Banner */}
      <div className="page-header">
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/students")}
            style={{ marginBottom: 12 }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Back to Directory</span>
          </button>
          <div className="page-title-group">
            <h1>Student Profile</h1>
            <p className="page-subtitle">Academic summary and registration record.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => navigate("/registrations")}>
            <BookOpen style={{ width: 16, height: 16 }} />
            <span>Course Registration</span>
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/students/${student.id}/edit`)}>
            <Edit style={{ width: 16, height: 16 }} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: getAvatarColor(student.full_name),
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              flexShrink: 0,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {getInitials(student.full_name)}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>
                {student.full_name}
              </h2>
              <span className="badge badge-plum">{student.student_id}</span>
              <span className="badge badge-sage">Active Enrollment</span>
            </div>

            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 4 }}>
              {student.department || "General Studies"} • {student.year || "Freshman"}
            </p>
          </div>
        </div>
      </div>

      {/* Grid details & course overview */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div>
          {/* Detailed Academic & Personal Info Card */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header">
              <h3 className="card-title">Personal & Academic Details</h3>
            </div>

            <div className="form-grid">
              <div>
                <span className="stat-label">Email Address</span>
                <p style={{ fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                  <span>{student.email}</span>
                </p>
              </div>

              <div>
                <span className="stat-label">Phone Number</span>
                <p style={{ fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                  <span>{student.phone || "Not provided"}</span>
                </p>
              </div>

              <div>
                <span className="stat-label">Department Program</span>
                <p style={{ fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Building2 style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                  <span>{student.department || "-"}</span>
                </p>
              </div>

              <div>
                <span className="stat-label">Year Level</span>
                <p style={{ fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <GraduationCap style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                  <span>{student.year || "-"}</span>
                </p>
              </div>

              <div>
                <span className="stat-label">Gender</span>
                <p style={{ fontWeight: 600, marginTop: 4 }}>{student.gender || "Unspecified"}</p>
              </div>

              <div>
                <span className="stat-label">Date of Birth</span>
                <p style={{ fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                  <span>{student.dob || "Not recorded"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Enrolled Courses</h3>
                <p className="card-subtitle">Active course units registered for current term</p>
              </div>
              <span className="badge badge-sage">Total 10 Credits</span>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Credits</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCourses.map((c) => (
                    <tr key={c.code}>
                      <td>
                        <span className="badge badge-plum">{c.code}</span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{c.title}</td>
                      <td>{c.credits} Cr.</td>
                      <td>
                        <span className="badge badge-sage">{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Activity Log */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Activity Log</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--sage-light)",
                    color: "var(--sage)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Student Registered</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                    {formatDate(student.created_at)}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--terracotta-light)",
                    color: "var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <BookOpen style={{ width: 16, height: 16 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Course Enrollment Verified</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>3 active courses assigned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;