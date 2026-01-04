import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect, test } from 'vitest'
import { useEmployees } from '@/hooks/useEmployees'
import { initializeSampleData } from '@/utils/storage'

const TestComponent: React.FC = () => {
  const { stats, employees, isLoading } = useEmployees()
  if (isLoading) return <div>Loading</div>
  return (
    <div>
      <div data-testid="total">{stats.total}</div>
      <div data-testid="active">{stats.active}</div>
      <div data-testid="inactive">{stats.inactive}</div>
      <div data-testid="count">{employees.length}</div>
    </div>
  )
}

test('useEmployees loads sample data and exposes stats', async () => {
  localStorage.clear()
  initializeSampleData()
  render(<TestComponent />)

  await waitFor(() => expect(screen.getByTestId('count')).toBeInTheDocument())

  const total = Number(screen.getByTestId('total').textContent)
  expect(total).toBeGreaterThan(0)
})
