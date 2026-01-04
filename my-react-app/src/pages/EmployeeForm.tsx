import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmployeeForm as EmployeeFormComponent } from '@/components/employees/EmployeeForm';
import { useEmployees } from '@/hooks/useEmployees';
import { getEmployeeById } from '@/utils/storage';
import { Employee, EmployeeFormData } from '@/types/employee';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const EmployeeFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addEmployee, updateEmployee } = useEmployees();
  
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      const emp = getEmployeeById(id);
      if (emp) {
        setEmployee(emp);
      } else {
        toast({
          title: 'Employee not found',
          description: 'The employee you are looking for does not exist.',
          variant: 'destructive',
        });
        navigate('/employees');
      }
      setIsLoading(false);
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (data: EmployeeFormData) => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isEditMode && id) {
      updateEmployee(id, data);
      toast({
        title: 'Employee updated',
        description: `${data.fullName}'s information has been updated.`,
      });
    } else {
      addEmployee(data);
      toast({
        title: 'Employee added',
        description: `${data.fullName} has been added to the team.`,
      });
    }

    setIsSaving(false);
    navigate('/employees');
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title={isEditMode ? 'Edit Employee' : 'Add Employee'}
        subtitle={isEditMode ? 'Update employee information' : 'Add a new team member'}
      >
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={isEditMode ? 'Edit Employee' : 'Add Employee'}
      subtitle={isEditMode ? 'Update employee information' : 'Add a new team member'}
    >
      <div className="mx-auto max-w-2xl">
        <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm">
          <EmployeeFormComponent
            employee={employee}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSaving}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeFormPage;
