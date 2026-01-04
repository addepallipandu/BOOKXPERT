import { Employee, AuthUser } from '@/types/employee';

const EMPLOYEES_KEY = 'employees';
const AUTH_KEY = 'auth_user';
const SAMPLE_VERSION_KEY = 'sample_version';
const CURRENT_SAMPLE_VERSION = '2';

// Employee Storage Operations
export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(EMPLOYEES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

export const addEmployee = (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Employee => {
  const employees = getEmployees();
  const newEmployee: Employee = {
    ...employee,
    id: `EMP-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  employees.push(newEmployee);
  saveEmployees(employees);
  return newEmployee;
};

export const updateEmployee = (id: string, data: Partial<Employee>): Employee | null => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;
  
  employees[index] = {
    ...employees[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveEmployees(employees);
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const employees = getEmployees();
  const filtered = employees.filter(emp => emp.id !== id);
  if (filtered.length === employees.length) return false;
  saveEmployees(filtered);
  return true;
};

export const getEmployeeById = (id: string): Employee | null => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id) || null;
};

// Auth Storage Operations
export const getAuthUser = (): AuthUser | null => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const setAuthUser = (user: AuthUser): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const clearAuthUser = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const employees = getEmployees();
  const version = localStorage.getItem(SAMPLE_VERSION_KEY);

  // If no employees or the sample version changed, (re)initialize with sample data
  if (employees.length === 0 || version !== CURRENT_SAMPLE_VERSION) {
    // remove any existing employees when upgrading sample data
    localStorage.removeItem(EMPLOYEES_KEY);
    const sampleEmployees: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        fullName: 'Ananya Sharma',
        gender: 'Female',
        dateOfBirth: '1992-08-21',
        profileImage: '',
        state: 'Maharashtra',
        isActive: true,
      },
      {
        fullName: 'Rohit Kumar',
        gender: 'Male',
        dateOfBirth: '1987-11-02',
        profileImage: '',
        state: 'Delhi',
        isActive: true,
      },
      {
        fullName: 'Priya Nair',
        gender: 'Female',
        dateOfBirth: '1994-04-15',
        profileImage: '',
        state: 'Karnataka',
        isActive: false,
      },
      {
        fullName: 'Vikram Singh',
        gender: 'Male',
        dateOfBirth: '1990-12-05',
        profileImage: '',
        state: 'Tamil Nadu',
        isActive: true,
      },
      {
        fullName: 'Neha Banerjee',
        gender: 'Female',
        dateOfBirth: '1993-06-18',
        profileImage: '',
        state: 'West Bengal',
        isActive: true,
      },
    ];
    
    sampleEmployees.forEach(emp => addEmployee(emp));
    localStorage.setItem(SAMPLE_VERSION_KEY, CURRENT_SAMPLE_VERSION);
  }
};
