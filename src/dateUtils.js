export function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function shiftLocalDate(dateStr, days) {
  const [year, month, day] = String(dateStr).split("-").map(Number);
  const base = new Date(year, (month || 1) - 1, day || 1);
  base.setDate(base.getDate() + days);
  return formatLocalDate(base);
}

export function todayLocalDate() {
  return formatLocalDate(new Date());
}

export function yesterdayLocalDate() {
  return shiftLocalDate(todayLocalDate(), -1);
}

export function daysAgoLocal(days) {
  return shiftLocalDate(todayLocalDate(), -days);
}
