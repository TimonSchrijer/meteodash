"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function PrecipitationChart({ days }) {
  // Format date for chart
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" })
  }

  // Prepare data for chart
  const data = days.map((day) => ({
    date: formatDate(day.date),
    value: day.precipitation,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, "dataMax + 1"]} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(value) => [`${value} mm`, "Neerslag"]} labelFormatter={(label) => `Datum: ${label}`} />
        <Bar dataKey="value" fill="#1E88E5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
