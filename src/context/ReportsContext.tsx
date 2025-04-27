import { createContext, useContext, useState, ReactNode } from 'react';

interface LeaveTiming {
  day: string;
  thisPeriod: number;
  lastPeriod: number;
}

interface LeaveBalance {
  type: string;
  balance: number;
  total: number;
}

interface ReportsData {
  timings: LeaveTiming[];
  balances: LeaveBalance[];
}

interface ReportsContextType {
  reportsData: ReportsData;
  timeRange: string;
  setTimeRange: (range: string) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const [timeRange, setTimeRange] = useState('This Month');

  // Dummy data
  const reportsData: ReportsData = {
    timings: [
      { day: 'Mon', thisPeriod: 2, lastPeriod: 1 },
      { day: 'Tue', thisPeriod: 1, lastPeriod: 2 },
      { day: 'Wed', thisPeriod: 3, lastPeriod: 1 },
      { day: 'Thu', thisPeriod: 0, lastPeriod: 1 },
      { day: 'Fri', thisPeriod: 2, lastPeriod: 3 },
    ],
    balances: [
      { type: 'Annual', balance: 10, total: 15 },
      { type: 'Sick', balance: 3, total: 5 },
      { type: 'Casual', balance: 2, total: 3 },
    ],
  };

  return (
    <ReportsContext.Provider value={{ reportsData, timeRange, setTimeRange }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};