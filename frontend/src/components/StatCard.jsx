import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  accentColor = "var(--primary)",
  iconBg = "var(--primary-light)",
  iconColor = "var(--primary)",
  trendText,
  trendPositive = true,
  subtext,
}) {
  return (
    <div
      className="stat-card"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        borderTop: `3.5px solid ${accentColor}`,
      }}
    >
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {trendText && (
          <div
            className="stat-badge"
            style={{
              background: trendPositive ? "var(--sage-light)" : "var(--terracotta-light)",
              color: trendPositive ? "var(--sage)" : "var(--terracotta)",
              border: `1px solid ${trendPositive ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)"}`,
            }}
          >
            {trendPositive ? (
              <TrendingUp style={{ width: 13, height: 13 }} />
            ) : (
              <TrendingDown style={{ width: 13, height: 13 }} />
            )}
            <span>{trendText}</span>
          </div>
        )}
        {subtext && !trendText && (
          <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{subtext}</span>
        )}
      </div>

      <div
        className="stat-icon-wrap"
        style={{
          background: iconBg,
          color: iconColor,
          boxShadow: `0 2px 8px ${iconColor}25`,
        }}
      >
        {typeof Icon === "function" || (typeof Icon === "object" && Icon !== null) ? (
          <Icon style={{ width: 22, height: 22 }} />
        ) : (
          <span style={{ fontSize: 20 }}>{Icon}</span>
        )}
      </div>
    </div>
  );
}

export default StatCard;