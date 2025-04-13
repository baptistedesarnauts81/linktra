import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip,
} from "recharts"

interface ChartTooltipContentProps {
  title: string
  items: {
    label: string
    value: string
    color: string
  }[]
  className?: string
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ title, items, className }) => {
  return (
    <div className={`rounded-md border p-2 shadow-md w-fit ${className}`}>
      <div className="font-bold">{title}</div>
      <ul>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
}

export const ChartContainer = ({ children }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

interface ChartProps {
  children: React.ReactNode
}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return <>{children}</>
}

export const LineChart = RechartsLineChart
export const Line = RechartsLine
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const ChartTooltip = Tooltip