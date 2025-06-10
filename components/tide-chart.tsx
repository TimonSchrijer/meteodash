"use client"

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", level: 1.8 },
  { time: "03:00", level: 0.5 },
  { time: "06:00", level: 1.9 },
  { time: "09:00", level: 0.4 },
  { time: "12:00", level: 2.0 },
  { time: "15:00", level: 0.3 },
  { time: "18:00", level: 1.9 },
  { time: "21:00", level: 0.5 },
]

export function TideChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <XAxis dataKey="time" tick={{ fontSize: 10 }} tickMargin={2} />
        <YAxis hide />
        <Area type="monotone" dataKey="level" stroke="#0891b2" fill="#0891b2" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
