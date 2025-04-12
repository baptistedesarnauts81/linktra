import { useState } from "react";
import WeekView from "./views/week";
import { EventGap, EventHeight, WeekCellsHeight } from "./constants";

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: EventColor;
  location?: string;
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleEventSelect = (event: CalendarEvent) => {
    console.log("Event selected:", event);
  };

  const handleEventCreate = (startTime: Date) => {};

  return (
    <div
      className="flex flex-1 flex-col"
      style={
        {
          "--event-height": `${EventHeight}px`,
          "--event-gap": `${EventGap}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <WeekView
        currentDate={currentDate}
        onEventSelect={handleEventSelect}
        onEventCreate={handleEventCreate}
      />
    </div>
  );
}
