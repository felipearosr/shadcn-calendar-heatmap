import { DataTable } from "@/components/data-table"
import {
  cn,
} from "@/lib/utils"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { ActivityProvider } from "@/app/context/activity-context"
import { ActivityCalendarHeatmap } from "@/components/activity-calendar-heatmap"

import { Card, CardAction, CardTitle, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

const fadeUpClassname =
  "lg:motion-safe:opacity-0 lg:motion-safe:animate-fade-up"

async function getRecentActivity() {
  const baseUrl = "https://mzfbselut5.execute-api.us-east-1.amazonaws.com/dev"
  const url = `${baseUrl}/api/v1/overview/recent-activity`
  console.log(`Fetching from: ${url}`)
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) {
    console.error("Failed to fetch data. Status:", res.status, res.statusText)
    const errorBody = await res.text()
    console.error("Error body:", errorBody)
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export default async function IndexPage() {
  const recentActivity = await getRecentActivity()
  return (
    <ActivityProvider>
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
        <SectionCards />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-6 items-stretch">
          <div className="h-full lg:col-span-3 flex flex-col">
            <ChartAreaInteractive />
          </div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Actividad por Día</CardTitle>
              <CardDescription>Distribución de actividad en el calendario</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityCalendarHeatmap
                className={cn(
                  fadeUpClassname,
                  "lg:motion-safe:[animation-delay:1000ms]"
                )}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <DataTable data={recentActivity} />
        </div>
      </div>
    </ActivityProvider>
  )
}

export const revalidate = 3600
