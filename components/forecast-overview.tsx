"use client"

import { Card } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow } from "lucide-react"

export function ForecastOverview({ days, selectedDayIndex, onDaySelect }) {
  // Format date to short format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString("nl-NL", { weekday: "short" }),
      date: date.getDate(),
    }
  }

  // Get weather icon based on icon code
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "storm":
        return <CloudLightning className="h-6 w-6 text-purple-500" />
      case "snow":
        return <CloudSnow className="h-6 w-6 text-blue-200" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => {
        const { day: dayName, date } = formatDate(day.date)
        const isSelected = index === selectedDayIndex

        return (
          <Card
            key={day.date}
            className={`p-2 cursor-pointer transition-all ${
              isSelected
                ? "bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => onDaySelect(index)}
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-sm font-medium">{dayName}</p>
              <p className="text-lg font-bold">{date}</p>
              <div className="my-2">{getWeatherIcon(day.iconcode)}</div>
              <p className="text-sm font-medium">{day.maxtemperature}°</p>
              <p className="text-xs text-gray-500">{day.mintemperature}°</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
