"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function WindChart({ days }) {
  // Format date for chart
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" })
  }

  // Prepare data for chart
  const data = days.map((day) => ({
    date: formatDate(day.date),
    speed: day.windspeedms,
    beaufort: day.beaufort,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 11 }} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 12]} tick={{ fontSize: 11 }} />
        <Tooltip
          formatter={(value, name) => [
            name === "speed" ? `${value} m/s` : `Beaufort ${value}`,
            name === "speed" ? "Windsnelheid" : "Beaufort",
          ]}
          labelFormatter={(label) => `Datum: ${label}`}
        />
        <Bar yAxisId="left" dataKey="speed" fill="#1E88E5" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="beaufort" fill="#90CAF9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
