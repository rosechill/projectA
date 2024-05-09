'use client'

import React, { useEffect, useState } from 'react'
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
} from '@nextui-org/react'
// import { UserInterface } from '@interfaces/userInterface'

// import apiGetUserAccount from '@services/api/apiUser'
import apiGetKaryawan from '@/service/api/apiUser';

// import { columns } from '@/utils/columnsTable/dataUser'

import {columns, users, statusOptions} from "@/utils/columnsTable/dataUser";
import { PlusIcon, ChevronDownIcon, SearchIcon, IconFilledEye, IconEdit, IconDelete } from '@/assets/icons'
import { capitalize } from '@/utils/capitalize'
import { DataKaryawan } from '@/interfaces/KaryawanInterface';
const INITIAL_VISIBLE_COLUMNS = ['id', 'username', 'role', 'password', 'actions']

export default function UserTable() {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  //
  const [statusFilter, setStatusFilter] = React.useState("all");


  const [users, setUsers] = useState<DataKaryawan[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiGetKaryawan()
        setUsers(response.data.data)
      } catch (error) {
        setLoading(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const pages = Math.ceil(users.length / rowsPerPage)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  // const filteredItems = React.useMemo(() => {
  //   let filteredUsers = [...users]

  //   if (hasSearchFilter) {
  //     filteredUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(filterValue.toLowerCase()))
  //   }

  //   return filteredUsers
  // }, [users, filterValue])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status),
    //   );
    // }
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a: UserInterface, b: UserInterface) => {
  //     const first = a[sortDescriptor.column as keyof UserInterface] as number
  //     const second = b[sortDescriptor.column as keyof UserInterface] as number
  //     const cmp = first < second ? -1 : first > second ? 1 : 0

  //     return sortDescriptor.direction === 'descending' ? -cmp : cmp
  //   })
  // }, [sortDescriptor, items])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any]
    const roleText = cellValue === '1' ? 'admin' : 'user'

    switch (columnKey) {
      case 'id':
      case 'username':
      case 'password':
        return (
          <div className='flex flex-col h-10 justify-center'>
            <p className="text-bold text-medium capitalize">{cellValue}</p>
          </div>
        )
      case 'role':
        return <p className="text-bold text-medium capitalize">{roleText}</p>
      case 'actions':
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Details">
              <span
                className="text-xl text-blue-600 cursor-pointer active:opacity-50"
              >
                <IconFilledEye />
              </span>
            </Tooltip>
            <Tooltip color="success" content="Edit user">
              <span
                className="text-xl text-success cursor-pointer active:opacity-50"
              >
                <IconEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-xl text-danger cursor-pointer active:opacity-50"
              >
                <IconDelete />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder="Search by name..."
            size="md"
            startContent={<SearchIcon className="text-medium" />}
            value={filterValue}
            variant="faded"
            onClear={() => setFilterValue('')}
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
              >
                {columns.map(column => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-[#0370C3] text-background"
              endContent={<PlusIcon />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-medium">Total {users.length} users</span>
          <label className="flex items-center text-medium">
            Rows per page:
            <select className="bg-transparent outline-none text-medium" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, users.length, hasSearchFilter])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-[#0370C3] text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="faded"
          onChange={setPage}
        />
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-medium', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  )

  // if (loading) return 'Loading...'

  return (
    <div className='p-7'>
      <h2 className="text-xl font-semibold pb-4">Master User</h2>
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
          {column => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {item => (
            <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
