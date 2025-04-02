"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ko } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    className?: string
    startDate?: Date
    endDate?: Date
    onChange?: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void
  }

export function DatePickerWithRange({
    className,
    startDate,
    endDate,
    onChange,
  }: DatePickerWithRangeProps) {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: startDate,
      to: endDate,
    })
  
    const handleSelect = (selected: DateRange | undefined) => {
      setRange(selected)
      onChange?.({ startDate: selected?.from, endDate: selected?.to })
    }
  
    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-center text-left font-normal",
                !range && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {range?.from ? (
                range.to ? (
                  <>
                    {format(range.from, "yyyy-MM-dd")} ~ {format(range.to, "yyyy-MM-dd")}
                  </>
                ) : (
                  format(range.from, "LLL dd, y")
                )
              ) : (
                <span>날짜를 선택하세요</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={ko}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
  