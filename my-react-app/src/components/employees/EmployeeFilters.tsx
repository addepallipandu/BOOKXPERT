import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Filters {
  search: string;
  gender: string;
  status: string;
}

interface EmployeeFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    onFilterChange({ ...filters, gender: value === 'all' ? '' : value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value === 'all' ? '' : value });
  };

  const clearFilters = () => {
    onFilterChange({ search: '', gender: '', status: '' });
  };

  const hasFilters = filters.search || filters.gender || filters.status;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 no-print">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      <Select value={filters.gender || 'all'} onValueChange={handleGenderChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
};
