import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getDaysInMonth } from "date-fns";
import { useEffect, useState } from "react";

interface DatePickerOTPProps {
  className?: string;
  onChange?: (date: Date) => void;
}

type dateType = {
  year?: number;
  month?: number;
  day?: number;
};

export function DatePicker({ className, onChange }: DatePickerOTPProps) {
  const [dateField, setDateField] = useState<dateType>();
  const [maxDay, setMaxDate] = useState<number | undefined>();

  useEffect(() => {
    if (dateField?.year && dateField.month) {
      const daysInMonth = getDaysInMonth(
        new Date(dateField.year, dateField.month - 1)
      );
      setMaxDate(daysInMonth);
      if (dateField?.day)
        if (dateField.day > daysInMonth)
          setDateField({ ...dateField, day: daysInMonth });
    }
  }, [dateField?.year, dateField?.month]);

  useEffect(() => {
    if (onChange)
      if (dateField?.year || dateField?.month || dateField?.day)
        onChange(
          new Date(
            dateField.year ?? 1900,
            (dateField.month ?? 1) - 1,
            dateField.day ?? 1
          )
        );
  }, [dateField]);

  return (
    <div
      className={cn(
        "w-full flex gap-4 items-center justify-between",
        className
      )}
    >
      <Input
        className="w-1/3"
        placeholder="année"
        aria-controls="false"
        value={dateField?.year ?? 1900}
        onChange={(e) =>
          parseInt(e.target.value) &&
          setDateField({ ...dateField, year: parseInt(e.target.value) })
        }
        type="number"
      />
      <Input
        className="w-1/3"
        placeholder="mois"
        value={dateField?.month ?? 1}
        onChange={(e) =>
          parseInt(e.target.value) &&
          parseInt(e.target.value) <= 12 &&
          parseInt(e.target.value) > 0 &&
          setDateField({ ...dateField, month: parseInt(e.target.value) })
        }
        type="number"
        min={1}
        max={12}
      />
      <Input
        className="w-1/3"
        value={dateField?.day ?? 1}
        onChange={(e) =>
          parseInt(e.target.value) &&
          setDateField({ ...dateField, day: parseInt(e.target.value) })
        }
        placeholder="mois"
        type="number"
        min={1}
        max={maxDay ?? 30}
      />
    </div>
  );
}
