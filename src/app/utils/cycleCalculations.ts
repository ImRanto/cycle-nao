import {
  CycleData,
  CycleResults,
  MonthlyCalendarDay,
} from "../types/cycle.types";

export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getLocalToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const formatYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const calculateCycle = (params: CycleData): CycleResults => {
  const startDate = parseLocalDate(params.startDate);
  const cycleLength = params.cycleLength;
  const periodLength = params.periodLength || 5;
  const lutealPhaseLength = params.lutealPhaseLength || 14;

  const periodEndDate = new Date(startDate);
  periodEndDate.setDate(periodEndDate.getDate() + periodLength - 1);

  const ovulationDate = new Date(startDate);
  ovulationDate.setDate(
    ovulationDate.getDate() + (cycleLength - lutealPhaseLength)
  );

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const today = getLocalToday();
  const diffMs = today.getTime() - startDate.getTime();
  const cycleDay = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;

  let currentPhase: CycleResults["currentPhase"] = "menstrual";
  let phaseProgress = 0;

  if (cycleDay <= periodLength) {
    currentPhase = "menstrual";
    phaseProgress = (cycleDay / periodLength) * 100;
  } else if (cycleDay <= cycleLength - lutealPhaseLength - 1) {
    currentPhase = "follicular";
    const follicularDays = cycleLength - lutealPhaseLength - periodLength;
    phaseProgress = ((cycleDay - periodLength) / follicularDays) * 100;
  } else if (cycleDay === cycleLength - lutealPhaseLength) {
    currentPhase = "ovulation";
    phaseProgress = 100;
  } else {
    currentPhase = "luteal";
    const lutealStartDay = cycleLength - lutealPhaseLength + 1;
    phaseProgress = ((cycleDay - lutealStartDay) / lutealPhaseLength) * 100;
  }

  return {
    ovulationDate: formatYYYYMMDD(ovulationDate),
    fertileWindow: {
      start: formatYYYYMMDD(fertileStart),
      end: formatYYYYMMDD(fertileEnd),
    },
    nextPeriod: formatYYYYMMDD(nextPeriod),
    cycleDay: cycleDay > 0 && cycleDay <= cycleLength ? cycleDay : 0,
    periodEndDate: formatYYYYMMDD(periodEndDate),
    currentPhase,
    phaseProgress: Math.min(Math.max(phaseProgress, 0), 100),
    lutealPhaseLength,
  };
};

export const generateMonthlyCalendar = (
  year: number,
  month: number,
  cycleStartDate: string,
  cycleLength: number,
  periodLength: number,
  lutealPhaseLength: number
): MonthlyCalendarDay[] => {
  try {
    const today = getLocalToday();
    const todayStr = formatYYYYMMDD(today);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

    const calendarDays: MonthlyCalendarDay[] = [];
    const cycleStart = parseLocalDate(cycleStartDate);

    for (let i = 0; i < firstDayOfWeek; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - (firstDayOfWeek - i));
      const dateStr = formatYYYYMMDD(date);
      const dayOfWeek = (date.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(date, cycleStart, cycleLength);
      const phase = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay + 1;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase,
        cycleDay: cycleDayNum,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatYYYYMMDD(date);
      const dayOfWeek = (date.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(date, cycleStart, cycleLength);
      const phase = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay + 1;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: day,
        isCurrentMonth: true,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase,
        cycleDay: cycleDayNum,
      });
    }

    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      const dateStr = formatYYYYMMDD(date);
      const dayOfWeek = (date.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(date, cycleStart, cycleLength);
      const phase = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay + 1;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: i,
        isCurrentMonth: false,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase,
        cycleDay: cycleDayNum,
      });
    }

    return calendarDays;
  } catch (error) {
    console.error("Erreur dans generateMonthlyCalendar:", error);
    return [];
  }
};

export const getCycleDayForDate = (
  targetDate: Date,
  cycleStartDate: Date,
  cycleLength: number
): number => {
  const d1 = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const d2 = new Date(
    cycleStartDate.getFullYear(),
    cycleStartDate.getMonth(),
    cycleStartDate.getDate()
  );
  const diffMs = d1.getTime() - d2.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  let cycleDay = (diffDays % cycleLength) + 1;
  if (cycleDay <= 0) cycleDay += cycleLength;
  return cycleDay;
};

const getPhaseForDay = (
  cycleDay: number,
  cycleLength: number,
  periodLength: number,
  lutealPhaseLength: number
): string => {
  const ovulationDay = cycleLength - lutealPhaseLength;
  if (cycleDay <= periodLength) return "menstrual";
  if (cycleDay < ovulationDay) return "follicular";
  if (cycleDay === ovulationDay) return "ovulation";
  return "luteal";
};

export const formatDate = (dateString: string): string => {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatShortDate = (dateString: string): string => {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};
