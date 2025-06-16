import { cn } from "../lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "container flex max-w-7xl flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-18 lg:pb-16",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export {
  PageHeader
}
