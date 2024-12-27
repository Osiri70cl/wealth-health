"use client";

import Link from "next/link";
import styles from "./EmployeeComponent.module.scss";

import { MOCKDATA } from "@/constant/mockData";
import { useEmployeeStore } from "@/zustand/employeeStore";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columns: ColumnDef<Employee>[] = [
  {
    header: "Prénom",
    accessorKey: "firstname",
  },
  {
    header: "Nom",
    accessorKey: "lastname",
  },
  {
    header: "Date de début de contrat",
    accessorKey: "jobStartDate",
  },
  {
    header: "Service",
    accessorKey: "service",
  },
  {
    header: "Date de naissance",
    accessorKey: "birthDate",
  },
  {
    header: "Rue",
    accessorKey: "street",
  },
  {
    header: "Ville",
    accessorKey: "city",
  },
  {
    header: "Région",
    accessorKey: "state",
  },
  {
    header: "Code postal",
    accessorKey: "zip",
  },
];

const EmployeeComponent = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { employees, getEmployees } = useEmployeeStore();
  const [data, setData] = useState(MOCKDATA);

  useEffect(() => {
    if (employees.length > 0) {
      const uniqueEmployees = [...MOCKDATA, ...employees].filter(
        (employee, index, self) =>
          index === self.findIndex((e) => e.id === employee.id)
      );
      setData(uniqueEmployees);
    }
  }, [employees]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Tout le personnel</h1>
      <div className={styles.switch}>
        <Link href={"/"} className={styles.inactive}>
          Création d'employé
        </Link>
        <div className={styles.active}>Voir les employés</div>
      </div>
      <div className={styles.tableControls}>
        <div className={styles.showEntries}>
          <label htmlFor="page-size-select">Montrer</label>
          <select
            id="page-size-select"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className={styles.select}
            tabIndex={0}
            aria-label="Nombre d'employés par page"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>employés</span>
        </div>
        <div className="m-input">
          <label htmlFor="search-input">Rechercher</label>
          <div className="m-input__core">
            <div className="m-input__core__prefix" aria-hidden="true">
              <MagnifyingGlass weight="bold" />
            </div>
            <input
              id="search-input"
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Recherche..."
              tabIndex={0}
              aria-label="Rechercher un employé"
            />
          </div>
        </div>
      </div>
      <table className={styles.table} role="grid" aria-label="Employés">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={(e) => {
                    e.preventDefault();
                    header.column.getToggleSortingHandler()?.(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      header.column.getToggleSortingHandler()?.(e);
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  aria-sort={
                    header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "ascending"
                      : "none"
                  }
                >
                  <div className={styles.headerContent}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className={styles.sortIcons} aria-hidden="true">
                      <span
                        className={`${styles.sortIcon} ${
                          header.column.getIsSorted() === "asc"
                            ? styles.active
                            : ""
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`${styles.sortIcon} ${
                          header.column.getIsSorted() === "desc"
                            ? styles.active
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} role="cell" tabIndex={0}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span role="status">
          Affiche{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          à{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          sur {table.getFilteredRowModel().rows.length} employés
        </span>
        <div className={styles.pageButtons}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="m-button m-button--secondary"
            aria-label="Page précédente"
            tabIndex={0}
          >
            <span>Précédent</span>
          </button>
          <span role="status" aria-live="polite">
            Page {table.getState().pagination.pageIndex + 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="m-button m-button--secondary"
            aria-label="Page suivante"
            tabIndex={0}
          >
            <span>Suivant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
