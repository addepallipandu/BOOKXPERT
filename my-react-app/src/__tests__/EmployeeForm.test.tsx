import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmployeeForm } from '@/components/employees/EmployeeForm'
import { expect, test, vi } from 'vitest'

test('EmployeeForm submits prefilled employee data', async () => {
  const handleSubmit = vi.fn()
  const handleCancel = vi.fn()

  const employee = {
    fullName: 'Test User',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    state: 'Delhi',
    isActive: true,
    profileImage: '',
  }

  render(
    <EmployeeForm
      employee={employee as any}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )

  const submit = screen.getByRole('button', { name: /Update Employee|Add Employee/i })
  await userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalled()
  const calledWith = handleSubmit.mock.calls[0][0]
  expect(calledWith.fullName).toBe('Test User')
  expect(calledWith.gender).toBe('Male')
})
