import type { ItemWithStatus } from '../types';

interface CalendarViewProps {
  items: ItemWithStatus[];
}

const getWeekDates = (startOffset: number = 0) => {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + startOffset + i);
    dates.push(date);
  }

  return dates;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDayLabel = (date: Date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const getNextReplaceDate = (item: ItemWithStatus): string => {
  const lastDate = new Date(item.lastReplacedAt + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 다음 교체일 계산
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + item.intervalDays);

  // 만약 다음 교체일이 이미 지났다면, 오늘 또는 가장 가까운 미래 날짜로
  if (nextDate < today) {
    return formatDate(today);
  }

  return formatDate(nextDate);
};

export const CalendarView = ({ items }: CalendarViewProps) => {
  const thisWeek = getWeekDates(0);
  const nextWeek = getWeekDates(7);

  const getItemsForDate = (dateStr: string) => {
    return items.filter((item) => {
      const nextDate = getNextReplaceDate(item);
      return nextDate === dateStr;
    });
  };

  const renderWeek = (week: Date[], title: string) => (
    <div className="calendar-week">
      <h3 className="calendar-week__title">{title}</h3>
      <div className="calendar-days">
        {week.map((date, idx) => {
          const dateStr = formatDate(date);
          const dayItems = getItemsForDate(dateStr);
          const today = isToday(date);

          return (
            <div key={idx} className={`calendar-day${today ? ' calendar-day--today' : ''}`}>
              <div className="calendar-day__header">
                <span className="calendar-day__date">{date.getDate()}</span>
                <span className="calendar-day__label">{getDayLabel(date)}</span>
              </div>
              <div className="calendar-day__items">
                {dayItems.length > 0 ? (
                  dayItems.map((item) => (
                    <div key={item.id} className={`calendar-item calendar-item--${item.status}`}>
                      <span className="calendar-item__icon">{item.icon}</span>
                      <span className="calendar-item__name">{item.name}</span>
                    </div>
                  ))
                ) : (
                  <span className="calendar-day__empty">-</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="calendar-view">
      {renderWeek(thisWeek, '이번 주')}
      {renderWeek(nextWeek, '다음 주')}
    </div>
  );
};
