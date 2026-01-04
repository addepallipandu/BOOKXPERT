import React from 'react';
import { format } from 'date-fns';
import { Employee } from '@/types/employee';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Printer, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EmployeeTableProps {
  employees: Employee[];
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPrint: () => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onToggleStatus,
  onEdit,
  onDelete,
  onPrint,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderBadgeVariant = (gender: string) => {
    switch (gender) {
      case 'Male':
        return 'bg-blue-100 text-blue-700';
      case 'Female':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-purple-100 text-purple-700';
    }
  };

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-foreground">No employees found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm printable">
      <div className="flex items-center justify-between border-b border-border px-6 py-4 no-print">
        <h3 className="font-medium text-foreground">
          Employee List ({employees.length})
        </h3>
        <Button variant="outline" size="sm" onClick={onPrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print List
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right no-print">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {employee.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarImage src={employee.profileImage} alt={employee.fullName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {getInitials(employee.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{employee.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', getGenderBadgeVariant(employee.gender))}>
                    {employee.gender}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(employee.dateOfBirth), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-muted-foreground">{employee.state}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={employee.isActive}
                      onCheckedChange={() => onToggleStatus(employee.id)}
                      className="no-print"
                    />
                    <Badge variant={employee.isActive ? 'default' : 'secondary'} className={cn(
                      employee.isActive ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground'
                    )}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right no-print">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(employee.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-accent"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(employee.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
