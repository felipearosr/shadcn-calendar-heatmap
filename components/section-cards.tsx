"use client"

import * as React from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Summary {
  total_processed: number
  successful: number
  errors: number
  success_rate: number
}

export function SectionCards() {
  const [summary, setSummary] = React.useState<Summary | null>(null)

  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          "https://mzfbselut5.execute-api.us-east-1.amazonaws.com/dev/api/v1/overview/summary",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        const data = await response.json()
        setSummary(data)
      } catch (error) {
        console.error("Failed to fetch summary:", error)
      }
    }

    fetchSummary()
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Documentos Procesados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary ? (
              summary.total_processed.toLocaleString()
            ) : (
              <Skeleton className="h-8 w-1/3" />
            )}
          </CardTitle>
          {/*
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
          */}
        </CardHeader>
        {/*
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
        */}
        </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Exitosos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary ? (
              summary.successful.toLocaleString()
            ) : (
              <Skeleton className="h-8 w-1/3" />
            )}
          </CardTitle>
          {/*
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
          */}
        </CardHeader>
        {/*
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
        */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Errores</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary ? (
              summary.errors.toLocaleString()
            ) : (
              <Skeleton className="h-8 w-1/3" />
            )}
          </CardTitle>
          {/*
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
          */}
        </CardHeader>
        {/*
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
        */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tasa de Éxito</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary ? (
              `${summary.success_rate.toFixed(2)}%`
            ) : (
              <Skeleton className="h-8 w-1/3" />
            )}
          </CardTitle>
          {/*
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
          */}
        </CardHeader>
        {/*
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
        */}
      </Card>
    </div>
  )
}