import { useState, useEffect, useCallback, useMemo } from 'react';
import { Employee, EmployeeFormData } from '@/types/employee';
import {
  getEmployees,
  addEmployee as addEmp,
  updateEmployee as updateEmp,
  deleteEmployee as deleteEmp,
  initializeSampleData,
} from '@/utils/storage';

interface Filters {
  search: string;
  gender: string;
  status: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    gender: '',
    status: '',
  });

  const loadEmployees = useCallback(() => {
    setIsLoading(true);
    initializeSampleData();
    const data = getEmployees();
    setEmployees(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const addEmployee = useCallback((data: EmployeeFormData): Employee => {
    const newEmployee = addEmp(data);
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  }, []);

  const updateEmployee = useCallback((id: string, data: Partial<Employee>): Employee | null => {
    const updated = updateEmp(id, data);
    if (updated) {
      setEmployees(prev => prev.map(emp => emp.id === id ? updated : emp));
    }
    return updated;
  }, []);

  const deleteEmployee = useCallback((id: string): boolean => {
    const success = deleteEmp(id);
    if (success) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
    return success;
  }, []);

  const toggleStatus = useCallback((id: string): void => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      updateEmployee(id, { isActive: !employee.isActive });
    }
  }, [employees, updateEmployee]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = filters.search
        ? emp.fullName.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      
      const matchesGender = filters.gender
        ? emp.gender === filters.gender
        : true;
      
      const matchesStatus = filters.status
        ? (filters.status === 'active' ? emp.isActive : !emp.isActive)
        : true;

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, filters]);

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(emp => emp.isActive).length,
    inactive: employees.filter(emp => !emp.isActive).length,
  }), [employees]);

  return {
    employees: filteredEmployees,
    allEmployees: employees,
    isLoading,
    filters,
    setFilters,
    stats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleStatus,
    refresh: loadEmployees,
  };
};
