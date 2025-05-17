import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  position: string;
  birthday: string;
  joinDate: string;
  techStack: never[];
  education: string;
  location: string;
  mobile: string;
  profilePicture: string;
  socialLinks: any;
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'hr' | 'tech_lead' | 'manager';
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate user object
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.name && ['employee', 'hr', 'tech_lead', 'manager'].includes(parsedUser.role)) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user'); // Clear invalid user data
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}