"use client";

import { useMemo } from "react";
import {
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfWeek,
  format,
  getHours,
  isPast,
  isToday,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { CalendarEvent } from "..";
import { cn } from "../lib/utils";
import { DroppableCell } from "../droppable";

type WeekViewProps = {
  currentDate: Date;
  onEventSelect: (e: CalendarEvent) => void;
  onEventCreate: (startTime: Date) => void;
};

export default function WeekView({ currentDate }: WeekViewProps) {
  const now = new Date();
  const days = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 0 }),
    [currentDate]
  );

  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({ start: dayStart, end: addHours(dayStart, 23) });
  }, [currentDate]);

  return (
    <div className="flex h-full flex-col">
      <div className="bg-background/80 border-border/70 sticky top-0 z-30 grid grid-cols-[4rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b backdrop-blur-md">
        <div className="text-muted-foreground/70 py-2 text-center text-sm">
          <span className="max-[479px]:sr-only text-xs">
            {format(new Date(), "O")}
          </span>
        </div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className="data-today:text-foreground text-muted-foreground/70 py-2 text-center text-sm data-today:font-medium"
            data-today={isToday(day) || undefined}
          >
            <span className="sm:hidden" aria-hidden="true">
              {format(day, "E")[0]} {format(day, "d")}
            </span>
            <span className="max-sm:hidden">{format(day, "EEE do")}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[4rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
        <div className="border-border/70 border-r">
          {hours.map((hour, index) => (
            <div
              key={hour.toString()}
              className="border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0"
            >
              {index > 0 && (
                <span className="bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs">
                  {format(hour, "hh a")}
                </span>
              )}
            </div>
          ))}
        </div>
        {days.map((day, dayIndex) => {
          const isPastDay = isPast(day) && !isToday(day);
          const isTodayDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={cn(
                "border-border/70 relative border-r last:border-r-0",
                // if there was no events
                true &&
                  !isToday(day) &&
                  "bg-[repeating-linear-gradient(deg,transparent,transparent_10px,#f0f0f0_8px,#f0f0f0_12px)]",
                // Past day pattern - use a different angle
                isPastDay &&
                  "bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,#f0f0f0_8px,#f0f0f0_12px)]"
              )}
              data-today={isToday(day) || undefined}
            >
              {hours.map((hour) => {
                const hourValue = getHours(hour);
                const isPastHour =
                  (isTodayDay && hourValue < now.getHours()) || isPastDay;
                return (
                  <div
                    key={hour.toString()}
                    className={cn(
                      "border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0"
                    )}
                  >
                    {/* Quarter-hour intervals */}
                    {[0, 1, 2, 3].map((quarter) => {
                      const quarterHourTime = hourValue + quarter * 0.25;
                      return (
                        <DroppableCell
                          key={`${hour.toString()}-${quarter}`}
                          id={`week-cell-${day.toISOString()}-${quarterHourTime}`}
                          date={day}
                          time={quarterHourTime}
                          className={cn(
                            "absolute h-[calc(var(--week-cells-height)/4)] w-full",
                            quarter === 0 && "top-0",
                            quarter === 1 &&
                              "top-[calc(var(--week-cells-height)/4)]",
                            quarter === 2 &&
                              "top-[calc(var(--week-cells-height)/4*2)]",
                            quarter === 3 &&
                              "top-[calc(var(--week-cells-height)/4*3)]"
                          )}
                          onClick={() => {
                            const startTime = new Date(day);
                            startTime.setHours(hourValue);
                            startTime.setMinutes(quarter * 15);
                            //onEventCreate(startTime)
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
