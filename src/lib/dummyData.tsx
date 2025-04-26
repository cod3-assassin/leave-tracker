export interface User {
    avatar: string;
    id: string;
    email: string;
    name: string;
    role: string;
    birthday?: string;
    joinDate?: string;
    techStack?: string[];
    education?: string;
    location?: string;
    mobile?: string;
    socialLinks?: {
      linkedin?: string;
      instagram?: string;
    };
  }
  
  export interface LeaveRequest {
    id: string;
    userId: string;
    type: 'Annual' | 'Sick' | 'Casual';
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }
  
  export interface LeaveBalance {
    type: 'Annual' | 'Sick' | 'Casual';
    balance: number;
    total: number;
  }
  
  export interface Notification {
    id: string;
    type: 'birthday' | 'anniversary';
    userId: string;
    date: string;
    message: string;
  }
  
  export interface LeaveSchedule {
    userId: string;
    startDate: string;
    endDate: string;
  }
  
  export const users: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'Junior Developer',
      birthday: '1990-04-25',
      joinDate: '2023-04-20',
      techStack: ['JavaScript', 'React', 'Node.js'],
      education: 'B.Sc. Computer Science, Stanford University',
      location: 'San Francisco, USA',
      mobile: '+1-555-123-4567',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        instagram: 'https://instagram.com/johndoe',
      },
      avatar: ""
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      role: 'Senior Developer',
      birthday: '1992-06-15',
      joinDate: '2022-06-10',
      techStack: ['TypeScript', 'React', 'GraphQL', 'AWS'],
      education: 'M.Sc. Software Engineering, MIT',
      location: 'New York, USA',
      mobile: '+1-555-234-5678',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/janesmith',
        instagram: 'https://instagram.com/janesmith',
      },
      avatar: ""
    },
    {
      id: '3',
      email: 'alice.jones@example.com',
      name: 'Alice Jones',
      role: 'HR Manager',
      birthday: '1988-08-30',
      joinDate: '2021-08-15',
      techStack: [],
      education: 'M.B.A., Harvard Business School',
      location: 'Boston, USA',
      mobile: '+1-555-345-6789',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/alicejones',
        instagram: 'https://instagram.com/alicejones',
      },
      avatar: ""
    },
    {
      id: '4',
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
      role: 'Tech Lead',
      birthday: '1985-03-12',
      joinDate: '2020-03-01',
      techStack: ['Python', 'Django', 'Docker', 'Kubernetes'],
      education: 'B.Sc. Computer Engineering, Caltech',
      location: 'Seattle, USA',
      mobile: '+1-555-456-7890',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/bobwilson',
        instagram: 'https://instagram.com/bobwilson',
      },
      avatar: ""
    },
    {
      id: '5',
      email: 'carol.brown@example.com',
      name: 'Carol Brown',
      role: 'DevOps Engineer',
      birthday: '1991-11-05',
      joinDate: '2022-11-01',
      techStack: ['AWS', 'Terraform', 'Jenkins', 'Linux'],
      education: 'B.Sc. Information Technology, UC Berkeley',
      location: 'Austin, USA',
      mobile: '+1-555-567-8901',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carolbrown',
        instagram: 'https://instagram.com/carolbrown',
      },
      avatar: ""
    },
    {
      id: '6',
      email: 'alice.jones@example.com',
      name: 'Alice Jones',
      role: 'HR Manager',
      birthday: '1988-08-30',
      joinDate: '2021-08-15',
      techStack: [],
      education: 'M.B.A., Harvard Business School',
      location: 'Boston, USA',
      mobile: '+1-555-345-6789',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/alicejones',
        instagram: 'https://instagram.com/alicejones',
      },
      avatar: ""
    },
      {
        id: '7',
        email: 'carol.brown@example.com',
        name: 'Carol Brown',
        role: 'DevOps Engineer',
        birthday: '1991-11-05',
        joinDate: '2022-11-01',
        techStack: ['AWS', 'Terraform', 'Jenkins', 'Linux'],
        education: 'B.Sc. Information Technology, UC Berkeley',
        location: 'Austin, USA',
        mobile: '+1-555-567-8901',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/carolbrown',
          instagram: 'https://instagram.com/carolbrown',
        },
        avatar: ""
      },
  ];
  
  export const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      userId: '1',
      type: 'Annual',
      startDate: '2025-05-01',
      endDate: '2025-05-05',
      status: 'Pending',
    },
    {
      id: '2',
      userId: '1',
      type: 'Sick',
      startDate: '2025-04-10',
      endDate: '2025-04-12',
      status: 'Approved',
    },
    {
      id: '3',
      userId: '1',
      type: 'Casual',
      startDate: '2025-03-15',
      endDate: '2025-03-16',
      status: 'Rejected',
    },
    {
      id: '4',
      userId: '1',
      type: 'Casual',
      startDate: '2025-03-15',
      endDate: '2025-03-16',
      status: 'Rejected',
    },
    {
      id: '5',
      userId: '1',
      type: 'Sick',
      startDate: '2025-04-10',
      endDate: '2025-04-12',
      status: 'Approved',
    },
    {
        id: '6',
        userId: '1',
        type: 'Sick',
        startDate: '2025-04-10',
        endDate: '2025-04-12',
        status: 'Approved',
      },
      {
        id: '7',
        userId: '1',
        type: 'Sick',
        startDate: '2025-04-10',
        endDate: '2025-04-12',
        status: 'Approved',
      },
  ];
  
  export const leaveBalances: LeaveBalance[] = [
    { type: 'Annual', balance: 15, total: 20 },
    { type: 'Sick', balance: 7, total: 10 },
    { type: 'Casual', balance: 5, total: 7 },
    
  ];
  
  export const notifications: Notification[] = [
    { id: '1', type: 'birthday', userId: '1', date: '2025-04-25', message: "John Doe's Birthday" },
    { id: '2', type: 'anniversary', userId: '1', date: '2025-04-20', message: "John Doe's 2nd Work Anniversary" },
    { id: '3', type: 'birthday', userId: '2', date: '2025-06-15', message: "Jane Smith's Birthday" },
    { id: '4', type: 'anniversary', userId: '3', date: '2025-08-15', message: "Alice Jones's 4th Work Anniversary" },
    { id: '5', type: 'anniversary', userId: '3', date: '2025-08-15', message: "Alice Jones's 4th Work Anniversary" },
    { id: '6', type: 'anniversary', userId: '3', date: '2025-08-15', message: "Alice Jones's 4th Work Anniversary" },


  ];
  
  export const leaveSchedules: LeaveSchedule[] = [
    { userId: '1', startDate: '2025-04-20', endDate: '2025-04-22' },
    { userId: '2', startDate: '2025-04-23', endDate: '2025-04-24' },
    { userId: '3', startDate: '2025-04-21', endDate: '2025-04-21' },
  ];

  export const hrActivities = [
    {
      id: 1,
      type: 'announcement',
      title: 'Company Picnic',
      date: '2025-05-15',
      description: 'Join us for a fun day at the park with food and games!',
    },
    {
      id: 2,
      type: 'workshop',
      title: 'Diversity Workshop',
      date: '2025-05-10',
      description: 'Learn about inclusivity in the workplace.',
    },
    {
      id: 3,
      type: 'event',
      title: 'Q2 Performance Reviews',
      date: '2025-06-01',
      description: 'Schedule your 1:1 with your manager.',
    },
  ];

  export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  