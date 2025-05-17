import { createContext, useState, ReactNode } from 'react';

interface AttendanceRecord {
    date: string;
    status: 'Present' | 'Absent' | 'On Leave';
    urgency?: 'Urgent' | 'Non-Urgent';
}

interface DashboardContextType {
    attendanceData: AttendanceRecord[];
    updateAttendance: (record: AttendanceRecord) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
    attendanceData: [],
    updateAttendance: () => { },
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([
        { date: '2025-05-05', status: 'Present' },
        { date: '2025-05-06', status: 'Present' },
        { date: '2025-05-07', status: 'Absent' },
        { date: '2025-05-08', status: 'On Leave', urgency: 'Urgent' },
        { date: '2025-05-09', status: 'Present' },
        { date: '2025-05-12', status: 'Present' },
        { date: '2025-05-13', status: 'On Leave', urgency: 'Non-Urgent' },
        { date: '2025-05-14', status: 'Absent' },
    ]);

    const updateAttendance = (record: AttendanceRecord) => {
        setAttendanceData((prev) =>
            prev.some((r) => r.date === record.date)
                ? prev.map((r) => (r.date === record.date ? record : r))
                : [...prev, record]
        );
    };

    return (
        <DashboardContext.Provider value={{ attendanceData, updateAttendance }}>
            {children}
        </DashboardContext.Provider>
    );
};