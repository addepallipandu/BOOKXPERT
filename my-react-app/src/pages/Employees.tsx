import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeFilters } from '@/components/employees/EmployeeFilters';
import { DeleteDialog } from '@/components/employees/DeleteDialog';
import { useEmployees } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/button';
import { UserPlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    employees,
    isLoading,
    filters,
    setFilters,
    toggleStatus,
    deleteEmployee,
    allEmployees,
  } = useEmployees();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleEdit = useCallback((id: string) => {
    navigate(`/employees/edit/${id}`);
  }, [navigate]);

  const handleDeleteClick = useCallback((id: string) => {
    const employee = allEmployees.find(emp => emp.id === id);
    if (employee) {
      setEmployeeToDelete({ id, name: employee.fullName });
      setDeleteDialogOpen(true);
    }
  }, [allEmployees]);

  const handleDeleteConfirm = useCallback(() => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      toast({
        title: 'Employee deleted',
        description: `${employeeToDelete.name} has been removed.`,
      });
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  }, [employeeToDelete, deleteEmployee, toast]);

  const handleToggleStatus = useCallback((id: string) => {
    const employee = allEmployees.find(emp => emp.id === id);
    if (employee) {
      toggleStatus(id);
      toast({
        title: 'Status updated',
        description: `${employee.fullName} is now ${employee.isActive ? 'inactive' : 'active'}.`,
      });
    }
  }, [allEmployees, toggleStatus, toast]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout title="Employees" subtitle="Manage your team">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Employees" subtitle="Manage your team members">
      {/* Header Actions */}
      <div className="mb-6 flex items-center justify-between no-print">
        <div className="text-sm text-muted-foreground">
          Showing {employees.length} of {allEmployees.length} employees
        </div>
        <Button onClick={() => navigate('/employees/new')} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <EmployeeFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Table */}
      <EmployeeTable
        employees={employees}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onPrint={handlePrint}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        employeeName={employeeToDelete?.name || ''}
      />
    </DashboardLayout>
  );
};

export default Employees;
