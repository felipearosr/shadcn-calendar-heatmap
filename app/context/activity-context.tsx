"use client"

import * as React from "react"

interface ActivityChartData {
  total: number
  data: {
    date: string
    count: number
  }[]
}

interface ActivityContextType {
  chartData: ActivityChartData | null
  isLoading: boolean
  error: Error | null
  fetchData: () => Promise<void>
}

const ActivityContext = React.createContext<ActivityContextType | undefined>(undefined)

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [chartData, setChartData] = React.useState<ActivityChartData | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchData = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://mzfbselut5.execute-api.us-east-1.amazonaws.com/dev/api/v1/overview/activity-chart"
      )
      const data = await response.json()
      setChartData(data)
    } catch (error) {
      console.error("Failed to fetch chart data:", error)
      setError(error instanceof Error ? error : new Error("Failed to fetch data"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ActivityContext.Provider value={{ chartData, isLoading, error, fetchData }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const context = React.useContext(ActivityContext)
  if (context === undefined) {
    throw new Error("useActivity must be used within an ActivityProvider")
  }
  return context
} 