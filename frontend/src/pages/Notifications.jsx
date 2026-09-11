import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import { Bell, CheckCircle2, UserPlus, BookOpen, AlertCircle, Check } from "lucide-react";

function Notifications() {
  const { addToast } = useToast();
  const [filter, setFilter] = useState("all");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Student Registered",
      desc: "Abebe Kebede has completed step registration for Computer Science.",
      time: "10 minutes ago",
      type: "registration",
      read: false,
    },
    {
      id: 2,
      title: "Course Enrollment Confirmed",
      desc: "32 students successfully registered for CS101 Introduction to Programming.",
      time: "2 hours ago",
      type: "course",
      read: false,
    },
    {
      id: 3,
      title: "System Maintenance Notice",
      desc: "Scheduled database backup will occur tonight at 02:00 AM UTC.",
      time: "1 day ago",
      type: "system",
      read: true,
    },
    {
      id: 4,
      title: "Academic Report Ready",
      desc: "End-of-term registration report is generated and ready for export.",
      time: "2 days ago",
      type: "system",
      read: true,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read", "success");
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "registration") return n.type === "registration";
    if (filter === "course") return n.type === "course";
    return true;
  });

  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <div className="page-header">
        <div className="page-title-group">
          <h1>System Notifications</h1>
          <p className="page-subtitle">Academic updates, registration logs, and system announcements.</p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={handleMarkAllRead}>
          <Check style={{ width: 14, height: 14 }} />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="card">
        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: 12,
            marginBottom: 20,
          }}
        >
          {["all", "unread", "registration", "course"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                background: filter === f ? "var(--primary)" : "var(--surface-alt)",
                color: filter === f ? "#FFFFFF" : "var(--text-secondary)",
                textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredNotifs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)" }}>
              No notifications found in this view.
            </div>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => handleToggleRead(n.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: 16,
                  borderRadius: "var(--radius-md)",
                  background: n.read ? "var(--surface)" : "var(--terracotta-light)",
                  border: "1px solid",
                  borderColor: n.read ? "var(--border-subtle)" : "var(--border)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: n.type === "registration" ? "var(--primary-light)" : "var(--sage-light)",
                    color: n.type === "registration" ? "var(--primary)" : "var(--sage)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {n.type === "registration" ? (
                    <UserPlus style={{ width: 18, height: 18 }} />
                  ) : (
                    <BookOpen style={{ width: 18, height: 18 }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      {n.title}
                    </h4>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{n.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
