import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Employee, EmployeeFormData } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Upload, User } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const INDIA_LOCATIONS = [
  // States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',

  // Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',

  // Common cities / places of interest
  'Mumbai', 'New Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad',
  'Jaipur', 'Udaipur', 'Agra', 'Varanasi', 'Goa (State)'
];

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select a gender' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  state: z.string().min(1, 'Please select a state'),
  isActive: z.boolean(),
});

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string>(employee?.profileImage || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: employee?.fullName || '',
      gender: employee?.gender || undefined,
      dateOfBirth: employee?.dateOfBirth || '',
      state: employee?.state || '',
      isActive: employee?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (employee) {
      form.reset({
        fullName: employee.fullName,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        state: employee.state,
        isActive: employee.isActive,
      });
      setImagePreview(employee.profileImage);
    }
  }, [employee, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const formData: EmployeeFormData = {
      fullName: values.fullName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      state: values.state,
      isActive: values.isActive,
      profileImage: imagePreview,
    };
    onSubmit(formData);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-border">
            <AvatarImage src={imagePreview} alt="Profile preview" />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
              {form.watch('fullName') ? getInitials(form.watch('fullName')) : <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
              {imagePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setImagePreview('')}
                  className="text-destructive"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender and Date of Birth Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="date" {...field} className="pr-10" />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* State */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {INDIA_LOCATIONS.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Set whether this employee is currently active
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
