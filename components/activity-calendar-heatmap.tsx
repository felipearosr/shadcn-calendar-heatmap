"use client"

import * as React from "react"
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap"
import { useActivity } from "@/app/context/activity-context"
import { cn } from "@/lib/utils"

const heatmapColors = [
  "text-white hover:text-white bg-blue-300 hover:bg-blue-300",
  "text-white hover:text-white bg-blue-400 hover:bg-blue-400",
  "text-white hover:text-white bg-blue-500 hover:bg-blue-500",
  "text-white hover:text-white bg-blue-600 hover:bg-blue-600",
]

export function ActivityCalendarHeatmap({ className }: { className?: string }) {
  const { chartData, isLoading } = useActivity()

  const weightedDates = React.useMemo(() => {
    if (!chartData?.data || chartData.data.length === 0) return []
    
    return chartData.data.map(item => ({
      date: new Date(item.date),
      weight: item.count
    }))
  }, [chartData])

  if (isLoading) {
    return null
  }

  if (!weightedDates.length) {
    return (
      <div className="flex items-center justify-center h-[280px] text-muted-foreground">
        No hay datos de actividad disponibles
      </div>
    )
  }

  return (
    <CalendarHeatmap
      className={className}
      variantClassnames={heatmapColors}
      weightedDates={weightedDates}
    />
  )
} 