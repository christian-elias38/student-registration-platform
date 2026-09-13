import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Shadcn Custom Tooltip component
const ShadcnCustomTooltip = ({ active, payload, label, unit = "students" }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "10px 14px",
          boxShadow: "var(--shadow-md)",
          fontSize: "12px",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text-secondary)" }}>
          {label}
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: entry.color || entry.fill || "var(--primary)",
              }}
            />
            <span style={{ fontWeight: 600 }}>{entry.name || "Enrollment"}:</span>
            <span style={{ fontWeight: 800, color: "var(--primary)" }}>
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// 1. SHADCN AREA CHART
export function ShadcnAreaChart({
  data = [],
  xKey = "month",
  dataKey = "count",
  height = 240,
  strokeColor = "#4F46E5",
  gradientColor = "#6366F1",
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="shadcnAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
            allowDecimals={false}
          />
          <Tooltip content={<ShadcnCustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            name="Enrolled Students"
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#shadcnAreaGrad)"
            activeDot={{ r: 6, fill: "#4F46E5", stroke: "#FFFFFF", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. SHADCN BAR CHART
export function ShadcnBarChart({
  data = [],
  xKey = "name",
  dataKey = "count",
  height = 240,
  barColor = "#4F46E5",
  unit = "students",
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
            dy={8}
            tickFormatter={(val) => (typeof val === "string" ? val.split(" ")[0] : val)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
            allowDecimals={false}
          />
          <Tooltip content={<ShadcnCustomTooltip unit={unit} />} />
          <Bar
            dataKey={dataKey}
            name="Students"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. SHADCN HORIZONTAL YEAR LEVEL BAR CHART
export function ShadcnYearBarChart({ data = [], height = 200 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ top: 8, right: 24, left: 24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
            allowDecimals={false}
          />
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-primary)", fontSize: 12, fontWeight: 700 }}
            width={130}
          />
          <Tooltip content={<ShadcnCustomTooltip unit="Students" />} />
          <Bar dataKey="count" name="Enrolled" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((entry, index) => (
              <Cell key={`cell-year-${index}`} fill={entry.color || "#4F46E5"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
