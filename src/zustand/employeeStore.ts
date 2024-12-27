"use client";
import { MOCKDATA } from "@/constant/mockData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  getEmployees: () => Employee[];
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),
      getEmployees: () => get().employees,
    }),
    {
      name: "employee-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ employees: state.employees }),
      merge: (persistedState: any, currentState: EmployeeStore) => ({
        ...currentState,
        employees: persistedState.employees || currentState.employees,
      }),
    }
  )
);
