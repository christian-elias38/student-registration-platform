import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { getStats } from "../services/api";
import { getInitials, getAvatarColor, formatDate } from "../utils/format";
import {
  Users,
  Building2,
  BookOpen,
  UserPlus,
  ArrowRight,
  TrendingUp,
  FileText,
  PlusCircle,
  Eye,
  BarChart2,
  PieChart,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, departments: 0, recent: [] });
  const [loading, setLoading] = useState(true);
  const [activePoint, setActivePoint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  const newThisMonth = stats.recent.filter((s) => {
    const d = new Date(s.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // Department distribution calculation
  const defaultDeptData = [
    { name: "Computer Science", count: 140, color: "var(--primary)" },
    { name: "Electrical Eng.", count: 95, color: "var(--terracotta)" },
    { name: "Business Admin.", count: 110, color: "var(--amber)" },
    { name: "Software Eng.", count: 85, color: "var(--sage)" },
    { name: "Civil Eng.", count: 60, color: "var(--plum-accent)" },
  ];

  // Year level breakdown
  const yearData = [
    { label: "1st Year (Freshman)", count: 165, percentage: 35, color: "var(--primary)" },
    { label: "2nd Year (Sophomore)", count: 130, percentage: 28, color: "var(--terracotta)" },
    { label: "3rd Year (Junior)", count: 105, percentage: 22, color: "var(--amber)" },
    { label: "4th Year (Senior)", count: 70, percentage: 15, color: "var(--sage)" },
  ];

  // Enrollment trend data for Area Chart
  const trendData = [
    { month: "Jan", count: 140 },
    { month: "Feb", count: 190 },
    { month: "Mar", count: 230 },
    { month: "Apr", count: 210 },
    { month: "May", count: 320 },
    { month: "Jun", count: Math.max(stats.total, 380) },
  ];

  const maxVal = Math.max(...trendData.map((d) => d.count), 400);

  // SVG Area Chart points
  const points = trendData.map((pt, idx) => {
    const x = 40 + idx * 88;
    const y = 140 - (pt.count / maxVal) * 110;
    return { ...pt, x, y };
  });

  const areaPath = `
    M ${points[0].x} 140 
    L ${points[0].x} ${points[0].y} 
    ${points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")} 
    L ${points[points.length - 1].x} 140 
    Z
  `;

  const linePath = `
    M ${points[0].x} ${points[0].y} 
    ${points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")}
  `;

  const maxBarVal = Math.max(...defaultDeptData.map((d) => d.count), 1);

  return (
    <div>
      {/* Welcome Banner Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>Academic Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, Admin! Real-time student registration metrics and department analytics.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => navigate("/reports")}>
            <FileText style={{ width: 16, height: 16 }} />
            <span>Generate Report</span>
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/register")}>
            <PlusCircle style={{ width: 16, height: 16 }} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="stats-grid">
        <StatCard
          label="Total Registered Students"
          value={loading ? "…" : stats.total}
          icon={Users}
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
          trendText="+12.4% this term"
          trendPositive={true}
        />
        <StatCard
          label="Active Departments"
          value={loading ? "…" : stats.departments || 5}
          icon={Building2}
          iconBg="var(--terracotta-light)"
          iconColor="var(--terracotta)"
          subtext="Full capacity programs"
        />
        <StatCard
          label="Offered Courses"
          value="48"
          icon={BookOpen}
          iconBg="var(--amber-light)"
          iconColor="var(--amber)"
          trendText="12 courses active"
          trendPositive={true}
        />
        <StatCard
          label="New Registrations"
          value={loading ? "…" : newThisMonth}
          icon={UserPlus}
          iconBg="var(--sage-light)"
          iconColor="var(--sage)"
          trendText={newThisMonth > 0 ? "Active influx" : "No new intake"}
          trendPositive={newThisMonth > 0}
        />
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>
          Quick Action Shortcuts
        </h3>
        <div className="quick-actions-grid">
          <div className="quick-action-card" onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
            <div className="quick-action-icon">
              <UserPlus style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div>Add Student</div>
              <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 500 }}>
                Register new student
              </span>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => navigate("/registrations")} style={{ cursor: "pointer" }}>
            <div className="quick-action-icon" style={{ color: "var(--terracotta)" }}>
              <BookOpen style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div>Course Registration</div>
              <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 500 }}>
                Enroll student in courses
              </span>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => navigate("/students")} style={{ cursor: "pointer" }}>
            <div className="quick-action-icon" style={{ color: "var(--sage)" }}>
              <Users style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div>Student Directory</div>
              <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 500 }}>
                Manage all profiles
              </span>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => navigate("/reports")} style={{ cursor: "pointer" }}>
            <div className="quick-action-icon" style={{ color: "var(--amber)" }}>
              <FileText style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div>System Analytics</div>
              <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 500 }}>
                Export & summary
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: AREA CHART & DEPARTMENT BAR CHART */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginBottom: 28 }}>
        {/* AREA CHART: Enrollment Growth Trend */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TrendingUp style={{ width: 18, height: 18, color: "var(--terracotta)" }} />
                <h3 className="card-title">Enrollment Growth (Area Chart)</h3>
              </div>
              <p className="card-subtitle">Cumulative monthly student registrations</p>
            </div>
            <span className="badge badge-plum">2026 Academic Term</span>
          </div>

          <div style={{ position: "relative", padding: "10px 0 0 0" }}>
            <svg viewBox="0 0 520 180" style={{ width: "100%", height: 180, overflow: "visible" }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--terracotta)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--terracotta)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line x1="20" y1="30" x2="500" y2="30" stroke="var(--border-subtle)" strokeDasharray="4 4" />
              <line x1="20" y1="85" x2="500" y2="85" stroke="var(--border-subtle)" strokeDasharray="4 4" />
              <line x1="20" y1="140" x2="500" y2="140" stroke="var(--border)" strokeWidth="1" />

              {/* Area Fill */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Area Border Stroke Line */}
              <path d={linePath} fill="none" stroke="var(--terracotta)" strokeWidth="3" strokeLinecap="round" />

              {/* Interactive Data Points */}
              {points.map((pt, idx) => (
                <g
                  key={pt.month}
                  onMouseEnter={() => setActivePoint(pt)}
                  onMouseLeave={() => setActivePoint(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={activePoint?.month === pt.month ? "7" : "5"}
                    fill="var(--surface)"
                    stroke="var(--terracotta)"
                    strokeWidth="3"
                    style={{ transition: "all 0.15s ease" }}
                  />
                  <text
                    x={pt.x}
                    y="160"
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="11"
                    fontWeight="700"
                  >
                    {pt.month}
                  </text>
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="10.5"
                    fontWeight="800"
                  >
                    {pt.count}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* BAR CHART: Department Enrollment Comparison */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BarChart2 style={{ width: 18, height: 18, color: "var(--primary)" }} />
                <h3 className="card-title">Department Distribution (Bar Chart)</h3>
              </div>
              <p className="card-subtitle">Enrolled students per department program</p>
            </div>
          </div>

          {/* Vertical Bar Chart */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justify: "space-between",
              height: 160,
              paddingTop: 20,
              borderBottom: "1px solid var(--border)",
            }}
          >
            {defaultDeptData.map((d) => {
              const heightPct = Math.round((d.count / maxBarVal) * 100);
              return (
                <div
                  key={d.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    gap: 6,
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-primary)" }}>
                    {d.count}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: `${heightPct}%`,
                      background: d.color,
                      borderRadius: "6px 6px 0 0",
                      transition: "height 0.4s ease",
                    }}
                    title={`${d.name}: ${d.count} students`}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      marginTop: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.name.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: YEAR LEVEL DISTRIBUTION BARS */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Year Level Breakdown</h3>
            <p className="card-subtitle">Distribution across freshman to senior levels</p>
          </div>
        </div>

        <div className="form-grid" style={{ gap: 16 }}>
          {yearData.map((y) => (
            <div
              key={y.label}
              style={{
                padding: "14px 16px",
                background: "var(--surface-alt)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{y.label}</span>
                <span style={{ fontWeight: 800, color: y.color }}>
                  {y.count} Students ({y.percentage}%)
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  width: "100%",
                  background: "var(--border-subtle)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${y.percentage}%`,
                    background: y.color,
                    borderRadius: 6,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Registrations</h3>
            <p className="card-subtitle">Latest registered students in system</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate("/students")}>
            <span>View All Students</span>
            <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        {stats.recent.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)" }}>
            <Users style={{ width: 36, height: 36, opacity: 0.5, marginBottom: 8 }} />
            <p>No students registered yet.</p>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/register")} style={{ marginTop: 12 }}>
              Add Your First Student
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Year Level</th>
                  <th>Date Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span className="badge badge-plum">{s.student_id}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: getAvatarColor(s.full_name),
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {getInitials(s.full_name)}
                        </div>
                        <div>
                          <div>{s.full_name}</div>
                          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>
                            {s.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-sage">{s.department || "General"}</span>
                    </td>
                    <td>{s.year || "-"}</td>
                    <td>{formatDate(s.created_at)}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/students/${s.id}`)}
                      >
                        <Eye style={{ width: 14, height: 14 }} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;