"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

const data = [
  { direction: "N", value: 10 },
  { direction: "NO", value: 15 },
  { direction: "O", value: 25 },
  { direction: "ZO", value: 20 },
  { direction: "Z", value: 15 },
  { direction: "ZW", value: 10 },
  { direction: "W", value: 5 },
  { direction: "NW", value: 8 },
]

export function WindRoseChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="direction" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} />
        <Radar name="Wind" dataKey="value" stroke="#1E88E5" fill="#1E88E5" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
