"use client"

import { Card } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow } from "lucide-react"

interface Day {
  date: string
  mintemperature: number
  maxtemperature: number
  iconcode: string
}

interface ForecastOverviewProps {
  days: Day[]
  selectedDayIndex: number
  onDaySelect: (index: number) => void
}

export function ForecastOverview({ days, selectedDayIndex, onDaySelect }: ForecastOverviewProps) {
  // Format date to short format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString("nl-NL", { weekday: "short" }),
      date: date.getDate(),
    }
  }

  // Get weather icon based on icon code
  const getWeatherIcon = (iconCode: string) => {
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
    <div className={`flex flex-row gap-2 justify-center items-stretch flex-wrap`}>
      {days.map((day: Day, index: number) => {
        const { day: dayName, date } = formatDate(day.date)
        const isSelected = index === selectedDayIndex

        return (
          <Card
            key={day.date}
            className={`w-28 sm:w-32 p-2 cursor-pointer transition-all flex-shrink-0 ${
              isSelected
                ? "bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => onDaySelect(index)}
          >
            <div className="flex flex-col items-center text-center gap-1">
              <p className="text-xs font-medium">{dayName}</p>
              <p className="text-base font-bold">{date}</p>
              <div className="my-1">{getWeatherIcon(day.iconcode)}</div>
              <p className="text-sm font-medium">{day.maxtemperature}°</p>
              <p className="text-xs text-gray-500">{day.mintemperature}°</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
