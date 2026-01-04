import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useEmployees } from '@/hooks/useEmployees';
import { Users, UserCheck, UserX, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { stats, allEmployees } = useEmployees();
  const navigate = useNavigate();

  const recentEmployees = allEmployees
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={stats.total}
          icon={Users}
          variant="accent"
          delay={0}
        />
        <StatCard
          title="Active Employees"
          value={stats.active}
          icon={UserCheck}
          variant="success"
          delay={100}
        />
        <StatCard
          title="Inactive Employees"
          value={stats.inactive}
          icon={UserX}
          variant="warning"
          delay={200}
        />
      </div>

      {/* Quick Actions & Recent Employees */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks at your fingertips</p>
          
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between h-14 px-4"
              onClick={() => navigate('/employees/new')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <UserPlus className="h-4 w-4 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Add New Employee</p>
                  <p className="text-xs text-muted-foreground">Create a new employee record</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-14 px-4"
              onClick={() => navigate('/employees')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">View All Employees</p>
                  <p className="text-xs text-muted-foreground">Browse and manage your team</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Recent Employees */}
        <div className="animate-slide-up rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Employees</h3>
              <p className="text-sm text-muted-foreground">Latest additions to your team</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/employees')}>
              View all
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {recentEmployees.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No employees yet
              </p>
            ) : (
              recentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarImage src={employee.profileImage} alt={employee.fullName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {getInitials(employee.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{employee.fullName}</p>
                      <p className="text-xs text-muted-foreground">{employee.state}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      employee.isActive
                        ? 'bg-success/10 text-success border-success/20'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
