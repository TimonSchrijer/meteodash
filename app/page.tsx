"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Moon,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CloudLightning,
  CloudSnow,
} from "lucide-react"
import { TemperatureChart } from "@/components/temperature-chart"
import { WindChart } from "@/components/wind-chart"
import { PrecipitationChart } from "@/components/precipitation-chart"
import { ForecastOverview } from "@/components/forecast-overview"
import { mockWeatherData } from "@/lib/mock-data"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [darkMode, setDarkMode] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("Noord-Holland")
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [weatherData, setWeatherData] = useState(mockWeatherData)

  // Fetch real data from endpoint on mount
  useEffect(() => {
    fetch("https://forecast-staging.buienradar.nl/3.0/beach")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.regions) {
          setWeatherData(
            data.regions.map((region: any) => ({
              region: region.region,
              days: region.days.map((day: any) => ({
                date: day.date,
                mintemperature: day.minTemperature,
                maxtemperature: day.maxTemperature,
                iconcode: day.iconCode,
                windspeedms: day.windSpeedMs,
                winddirectiondegrees: day.windDirectionDegrees,
                winddirection: day.windDirection,
                beaufort: day.beaufort,
                precipitation: day.precipitation,
                uvindex: day.uvIndex,
                waveheight: day.waveHeight,
                wavedirection: day.waveDirection,
                seawatertemperature: day.seaWaterTemperature,
                lowtide: day.lowTide,
                hightide: day.highTide,
                alert_jellyfish: day.warningJellyfish ? "True" : "False",
                alert_floatingdevices: day.warningFloatingDevices ? "True" : "False",
                alert_dangeroussea: day.warningDangerousSea ? "True" : "False",
                alert_ripcurrent: day.warningRipCurrent ? "True" : "False",
              })),
            }))
          )
        }
      })
      .catch(() => {
        // fallback to mockWeatherData
        setWeatherData(mockWeatherData)
      })
  }, [])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Format date to Dutch locale
  const formattedDate = currentTime.toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = currentTime.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Get current region data
  const getCurrentRegionData = () => {
    const region = weatherData.find((r: any) => r.region === selectedRegion)
    return region?.days || []
  }

  const currentRegionDays = getCurrentRegionData()
  const currentDayData = currentRegionDays[selectedDayIndex] || {}

  // Navigate between days
  const goToPreviousDay = () => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(selectedDayIndex - 1)
    }
  }

  const goToNextDay = () => {
    if (selectedDayIndex < currentRegionDays.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1)
    }
  }

  // Format forecast date
  const formatForecastDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  // Get weather icon based on icon code
  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      case "storm":
        return <CloudLightning className="h-10 w-10 text-purple-500" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-blue-200" />
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />
    }
  }

  // Get alert status color
  const getAlertColor = (status: string) => {
    return status === "True" ? "destructive" : "secondary"
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4" id="logo-placeholder">
            {/* Meteorologen Dashboard Logo */}
            <img src="/meteodashboard-logo.svg" alt="Meteorologen Dashboard" className="h-8 md:h-10 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} id="dark-mode" />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white font-condensed">Kust Regio's</h2>
        </div>

        <Tabs defaultValue="Noord-Holland" onValueChange={setSelectedRegion}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger
              value="Noord-Holland"
              className="font-condensed data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-700 data-[state=active]:shadow-lg data-[state=active]:font-bold hover:bg-blue-100 hover:text-blue-900 transition-colors"
            >
              Noord-Holland
            </TabsTrigger>
            <TabsTrigger
              value="Zuid-Holland"
              className="font-condensed data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-700 data-[state=active]:shadow-lg data-[state=active]:font-bold hover:bg-blue-100 hover:text-blue-900 transition-colors"
            >
              Zuid-Holland
            </TabsTrigger>
            <TabsTrigger
              value="Zeeland"
              className="font-condensed data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-700 data-[state=active]:shadow-lg data-[state=active]:font-bold hover:bg-blue-100 hover:text-blue-900 transition-colors"
            >
              Zeeland
            </TabsTrigger>
            <TabsTrigger
              value="Waddeneilanden"
              className="font-condensed data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-700 data-[state=active]:shadow-lg data-[state=active]:font-bold hover:bg-blue-100 hover:text-blue-900 transition-colors"
            >
              Waddeneilanden
            </TabsTrigger>
          </TabsList>

          {weatherData.map((region) => (
            <TabsContent key={region.region} value={region.region} className="space-y-6">
              {/* Forecast Overview */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-condensed">
                    {region.days.length}-Daagse Verwachting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ForecastOverview
                    days={region.days}
                    selectedDayIndex={selectedDayIndex}
                    onDaySelect={(index: number) => setSelectedDayIndex(index)}
                  />
                </CardContent>
              </Card>

              {/* Day Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousDay}
                  disabled={selectedDayIndex === 0}
                  className="font-condensed"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Vorige Dag
                </Button>
                <h3 className="text-lg font-medium font-condensed">{formatForecastDate(currentDayData.date)}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextDay}
                  disabled={selectedDayIndex === region.days.length - 1}
                  className="font-condensed"
                >
                  Volgende Dag
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Enhanced Alerts Sectie - Moved to prominent position */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3 font-condensed">
                    <AlertTriangle className="h-7 w-7 text-orange-500" />
                    <div>
                      <h3>Waarschuwingen & Alerts</h3>
                      <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        {formatForecastDate(currentDayData.date)} - {selectedRegion}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${currentDayData.alert_jellyfish === "True" ? "bg-red-500" : "bg-green-500"}`}
                        ></div>
                        <span className="font-medium font-condensed">Kwallen Waarschuwing</span>
                      </div>
                      <Badge variant={getAlertColor(currentDayData.alert_jellyfish)} className="font-condensed">
                        {currentDayData.alert_jellyfish === "True" ? "ACTIEF" : "Geen"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${currentDayData.alert_floatingdevices === "True" ? "bg-red-500" : "bg-green-500"}`}
                        ></div>
                        <span className="font-medium font-condensed">Drijvende Objecten</span>
                      </div>
                      <Badge variant={getAlertColor(currentDayData.alert_floatingdevices)} className="font-condensed">
                        {currentDayData.alert_floatingdevices === "True" ? "ACTIEF" : "Geen"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${currentDayData.alert_dangeroussea === "True" ? "bg-red-500" : "bg-green-500"}`}
                        ></div>
                        <span className="font-medium font-condensed">Gevaarlijke Zee</span>
                      </div>
                      <Badge variant={getAlertColor(currentDayData.alert_dangeroussea)} className="font-condensed">
                        {currentDayData.alert_dangeroussea === "True" ? "ACTIEF" : "Geen"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${currentDayData.alert_ripcurrent === "True" ? "bg-red-500" : "bg-green-500"}`}
                        ></div>
                        <span className="font-medium font-condensed">Muistromen</span>
                      </div>
                      <Badge variant={getAlertColor(currentDayData.alert_ripcurrent)} className="font-condensed">
                        {currentDayData.alert_ripcurrent === "True" ? "ACTIEF" : "Geen"}
                      </Badge>
                    </div>
                  </div>

                  {/* Alert Summary */}
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 font-condensed">
                        Totaal Actieve Waarschuwingen:
                      </span>
                      <span className="text-lg font-bold text-orange-600 font-condensed">
                        {
                          [
                            currentDayData.alert_jellyfish,
                            currentDayData.alert_floatingdevices,
                            currentDayData.alert_dangeroussea,
                            currentDayData.alert_ripcurrent,
                          ].filter((alert) => alert === "True").length
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Day Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Temperatuur Kaart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Temperatuur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold font-condensed">{currentDayData.maxtemperature}°C</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Min: {currentDayData.mintemperature}°C
                        </p>
                      </div>
                      {getWeatherIcon(currentDayData.iconcode)}
                    </div>
                  </CardContent>
                </Card>

                {/* Wind Kaart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Wind</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold font-condensed">{currentDayData.windspeedms} m/s</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Richting: {currentDayData.winddirection} ({currentDayData.winddirectiondegrees}°)
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Beaufort: {currentDayData.beaufort}</p>
                      </div>
                      <Wind className="h-10 w-10 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                {/* Neerslag Kaart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Neerslag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold font-condensed">{currentDayData.precipitation} mm</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">UV-index: {currentDayData.uvindex}</p>
                      </div>
                      <Droplets className="h-10 w-10 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                {/* Zee Condities Kaart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Zee Condities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium font-condensed">Golfhoogte:</p>
                        <p>{currentDayData.waveheight} m</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium font-condensed">Watertemperatuur:</p>
                        <p>{currentDayData.seawatertemperature}°C</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium font-condensed">Getijden:</p>
                        <p>Laag {currentDayData.lowtide?.[0]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Temperatuur Trend */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Temperatuur Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <TemperatureChart days={region.days} />
                    </div>
                  </CardContent>
                </Card>

                {/* Wind Trend */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Wind Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <WindChart days={region.days} />
                    </div>
                  </CardContent>
                </Card>

                {/* Neerslag Trend */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-condensed">Neerslag Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <PrecipitationChart days={region.days} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

// Label component
function Label({ htmlFor, children, className }: { htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
    >
      {children}
    </label>
  )
}
