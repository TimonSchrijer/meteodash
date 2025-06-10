"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function TemperatureChart({ days }) {
  // Format date for chart
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" })
  }

  // Prepare data for chart
  const data = days.map((day) => ({
    date: formatDate(day.date),
    max: day.maxtemperature,
    min: day.mintemperature,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 11 }} />
        <Tooltip
          formatter={(value, name) => [`${value}°C`, name === "max" ? "Maximum temperatuur" : "Minimum temperatuur"]}
          labelFormatter={(label) => `Datum: ${label}`}
        />
        <Line type="monotone" dataKey="max" stroke="#FF5722" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="min" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
