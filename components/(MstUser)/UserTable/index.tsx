"use client";
import React, { useEffect, useState, ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  PlusIcon,
  ChevronDownIcon,
  SearchIcon,
  IconFilledEye,
  IconEdit,
  IconDelete,
} from "@/assets/icons";
import { capitalize } from "@/utils/capitalize";
import { DataUser } from "@/interfaces/UserInterface";
import { columns } from "@/utils/columnsTable/dataUser";
import apiGetUser from "@/service/api/apiUser";
import ViewUserModal from "../ViewUserModal";

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "email", "actions"];

export default function UserTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [Users, setUsers] = useState<DataUser[]>([]);

  const { isOpen: isAddUserModalOpen, onOpenChange: onAddUserModalOpenChange } =
    useDisclosure();

  const [selectedUser, setSelectedUser] = useState<DataUser | null>(null);
  // View User Modal
  const {
    isOpen: isViewUserModalOpen,
    onOpenChange: onViewUserModalOpenChange,
  } = useDisclosure();

  // Open User Details Modal
  const openUserDetailsModal = (Users: DataUser) => {
    setSelectedUser(Users);
    onViewUserModalOpenChange();
  };

  // Close User Details Modal
  const onCloseUserModal = () => {
    setSelectedUser(null);
    onViewUserModalOpenChange();
  };

  // Edit User modal
  const {
    isOpen: isEditUserModalOpen,
    onOpenChange: onEditUserModalOpenChange,
  } = useDisclosure();

  // Selected User
  const openUserEditModal = (Users: DataUser) => {
    setSelectedUser(Users);
    onEditUserModalOpenChange();
  };

  // Close Edit User Modal
  const onCloseEditUserModal = () => {
    setSelectedUser(null);
    onEditUserModalOpenChange();
  };

  // Delete User Modal
  const {
    isOpen: isDeleteUserModalOpen,
    onOpenChange: onDeleteUserModalOpenChange,
  } = useDisclosure();

  const openUserDeleteModal = (Users: DataUser) => {
    setSelectedUser(Users);
    onDeleteUserModalOpenChange();
  };

  const onCloseDeleteUserModal = () => {
    setSelectedUser(null);
    onDeleteUserModalOpenChange();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiGetUser();
        setUsers(response.data.data);
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = Math.ceil(Users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...Users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((User) =>
        User.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [Users, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: DataUser, b: DataUser) => {
      const first = a[sortDescriptor.column as keyof DataUser] as number;
      const second = b[sortDescriptor.column as keyof DataUser] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (User: DataUser, columnKey: React.Key): ReactNode => {
      const cellValue = User[columnKey as keyof DataUser];

      switch (columnKey) {
        case "id":
          return <div>{User.id}</div>;
        case "name":
          return <div>{User.name}</div>;
        case "email":
          return <div>{User.email}</div>;
        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <Tooltip
                content="Details"
                className="p-1.5 border rounded-lg bg-white border-blue-600"
              >
                <span
                  onClick={() => openUserDetailsModal(User)}
                  className="text-xl text-blue-600 cursor-pointer active:opacity-50"
                >
                  <IconFilledEye />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="md"
            startContent={<SearchIcon className="text-medium" />}
            value={filterValue}
            variant="faded"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  className="border-1 border-[#0370C3]"
                  endContent={<ChevronDownIcon className="text-medium" />}
                  size="md"
                  variant="faded"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="bg-background border-1 border-divider py-4 px-3"
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-medium">Total {Users.length} User</span>
          <label className="flex items-center text-medium">
            Rows per page:
            <select
              className="bg-transparent outline-none text-medium"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    Users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-[#0370C3] text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="faded"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-medium", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  if (loading) return "Loading...";

  return (
    <div className="p-7">
      <div className="p-4 border border-gray-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold pb-4">Master User</h2>
        <Table
          isCompact
          removeWrapper
          aria-label="Data Table User"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={classNames}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No User found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ViewUserModal
          isOpen={isViewUserModalOpen}
          onClose={onCloseUserModal}
          title="User Details"
          UserData={selectedUser}
        />
      </div>
    </div>
  );
}
