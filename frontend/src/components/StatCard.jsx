import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  cardBg = "var(--surface)",
  cardBorder = "var(--border)",
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
        background: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {trendText && (
          <div
            className="stat-badge"
            style={{
              background: trendPositive ? "rgba(94, 122, 100, 0.15)" : "rgba(200, 109, 81, 0.15)",
              color: trendPositive ? "var(--sage)" : "var(--terracotta)",
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

      <div className="stat-icon-wrap" style={{ background: iconBg, color: iconColor }}>
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