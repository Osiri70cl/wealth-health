import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<Employee>[] = [
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
    cell: ({ getValue }) => {
      const value = getValue();
      let date = dayjs(value);
      if (!date.isValid()) {
        const [day, month, year] = value.split("-");
        date = dayjs(`${year}-${month}-${day}`);
      }
      return date.isValid() ? date.format("DD/MM/YYYY") : value;
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.jobStartDate;
      const b = rowB.original.jobStartDate;

      const dateA = dayjs(a).isValid()
        ? dayjs(a)
        : dayjs(`${a.split("-")[2]}-${a.split("-")[1]}-${a.split("-")[0]}`);

      const dateB = dayjs(b).isValid()
        ? dayjs(b)
        : dayjs(`${b.split("-")[2]}-${b.split("-")[1]}-${b.split("-")[0]}`);

      return dateA.unix() - dateB.unix();
    },
  },
  {
    header: "Service",
    accessorKey: "service",
  },
  {
    header: "Date de naissance",
    accessorKey: "birthDate",
    cell: ({ getValue }) => {
      const value = getValue();
      let date = dayjs(value);
      if (!date.isValid()) {
        const [day, month, year] = value.split("-");
        date = dayjs(`${year}-${month}-${day}`);
      }
      return date.isValid() ? date.format("DD/MM/YYYY") : value;
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.birthDate;
      const b = rowB.original.birthDate;

      const dateA = dayjs(a).isValid()
        ? dayjs(a)
        : dayjs(`${a.split("-")[2]}-${a.split("-")[1]}-${a.split("-")[0]}`);

      const dateB = dayjs(b).isValid()
        ? dayjs(b)
        : dayjs(`${b.split("-")[2]}-${b.split("-")[1]}-${b.split("-")[0]}`);

      return dateA.unix() - dateB.unix();
    },
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
