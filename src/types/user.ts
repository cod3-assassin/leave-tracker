export interface User {
    id: string;
    email: string;
    name: string;
    role: 'employee' | 'hr' | 'tech_lead' | 'manager';
  }
  
  export const users: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'employee',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      role: 'employee',
    },
    {
      id: '3',
      email: 'alice.jones@example.com',
      name: 'Alice Jones',
      role: 'hr',
    },
    {
      id: '4',
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
      role: 'manager',
    },
    {
      id: '5',
      email: 'carol.brown@example.com',
      name: 'Carol Brown',
      role: 'tech_lead',
    },
  ];