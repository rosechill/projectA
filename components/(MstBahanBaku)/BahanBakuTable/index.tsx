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
import { DataBahanBaku } from "@/interfaces/BahanBakuInterface";
import { columns } from "@/utils/columnsTable/bahanBaku";
import apiGetBahanBaku from "@/service/api/apiBahanBaku";
import AddBahanBakuModal from "../AddBahanBakuModal";
import ViewBahanBakuModal from "../ViewBahanBakuModal";
import DeleteBahanBakuModal from "../DeleteBahanBakuModal";
import EditBahanBakuModal from "../EditBahanBakuModal";

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "stok", "satuan", "actions"];

export default function BahanBakuTable() {
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

  const [bahanBakus, setBahanBakus] = useState<DataBahanBaku[]>([]);

  //handlerModal

  //add Modal
  const [selectedBahanBaku, setSelectedBahanBaku] = useState<DataBahanBaku | null>(
    null
  );
  const {
    isOpen: isAddBahanBakuModalOpen,
    onOpenChange: onAddBahanBakuModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isViewBahanBakuModalOpen,
    onOpenChange: onViewBahanBakuModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteBahanBakuModalOpen,
    onOpenChange: onDeleteBahanBakuModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditBahanBakuModalOpen,
    onOpenChange: onEditBahanBakuModalOpenChange,
  } = useDisclosure();

  const openBahanBakuDetailsModal = (bahanBakus: DataBahanBaku) => {
    setSelectedBahanBaku(bahanBakus);
    onViewBahanBakuModalOpenChange();
  };
  const openBahanBakuDeleteModal = (bahanBakus: DataBahanBaku) => {
    setSelectedBahanBaku(bahanBakus);
    onDeleteBahanBakuModalOpenChange();
  };
  const openBahanBakuEditModal = (bahanBakus: DataBahanBaku) => {
    setSelectedBahanBaku(bahanBakus);
    onEditBahanBakuModalOpenChange();
  };
  const onCloseDetailBahanBakuModal = () => {
    setSelectedBahanBaku(null);
    onViewBahanBakuModalOpenChange();
  };
  const onCloseDeleteBahanBakuModal = () => {
    setSelectedBahanBaku(null);
    onDeleteBahanBakuModalOpenChange();
  };
  const onCloseEditBahanBakuModal = () => {
    setSelectedBahanBaku(null);
    onEditBahanBakuModalOpenChange();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiGetBahanBaku();
        // console.log(response.data.data);
        setBahanBakus(response.data.data);
      } catch (error) {
        // console.log(error)
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = Math.ceil(bahanBakus.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredBahanBakus = [...bahanBakus];

    if (hasSearchFilter) {
      filteredBahanBakus = filteredBahanBakus.filter((user) =>
        user.name.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredBahanBakus;
  }, [bahanBakus, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: DataBahanBaku, b: DataBahanBaku) => {
      const first = a[sortDescriptor.column as keyof DataBahanBaku] as number;
      const second = b[sortDescriptor.column as keyof DataBahanBaku] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = React.useCallback(
    (bahanBaku: DataBahanBaku, columnKey: React.Key) => {
      const cellValue = bahanBaku[columnKey as keyof DataBahanBaku];

      switch (columnKey) {
        case "id":
          return <div>{bahanBaku.id}</div>;
        case "kelipatan":
          return <div> {bahanBaku.name}</div>;
        case "stok":
          return <div>{bahanBaku.stok}</div>;
        case "satuan":
          return <div>{bahanBaku.satuan}</div>;

        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <Tooltip
                content="Details"
                className="p-1.5 border rounded-lg bg-white border-blue-600"
              >
                <span
                  onClick={() => openBahanBakuDetailsModal(bahanBaku)}
                  className="text-xl text-blue-600 cursor-pointer active:opacity-50"
                >
                  <IconFilledEye />
                </span>
              </Tooltip>
              <Tooltip
                color="success"
                className="p-1.5 rounded-lg border border-white"
                content="Edit BahanBaku"
              >
                <span
                  onClick={() => openBahanBakuEditModal(bahanBaku)}
                  className="text-xl text-success cursor-pointer active:opacity-50"
                >
                  <IconEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" className="p-1.5" content="Delete bahan baku">
                <span
                  onClick={() => openBahanBakuDeleteModal(bahanBaku)}
                  className="text-xl text-danger cursor-pointer active:opacity-50"
                >
                  <IconDelete />
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
            <Button
              onClick={onAddBahanBakuModalOpenChange}
              className="bg-[#0370C3] text-background"
              endContent={<PlusIcon />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-medium">Total {bahanBakus.length} BahanBakus</span>
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
    bahanBakus.length,
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
    <div className="p-4 border border-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold pb-4">Master BahanBaku</h2>
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
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddBahanBakuModal
        isOpen={isAddBahanBakuModalOpen}
        onClose={onAddBahanBakuModalOpenChange}
        title="Add BahanBaku"
      />
      <ViewBahanBakuModal
        isOpen={isViewBahanBakuModalOpen}
        onClose={onCloseDetailBahanBakuModal}
        title="BahanBaku Details"
        bahanBakuData={selectedBahanBaku}
      />
      <DeleteBahanBakuModal
        isOpen={isDeleteBahanBakuModalOpen}
        onClose={onCloseDeleteBahanBakuModal}
        title="Delete BahanBaku Confirmation"
        bahanBakuData={selectedBahanBaku}
      />
      <EditBahanBakuModal
        isOpen={isEditBahanBakuModalOpen}
        onClose={onCloseEditBahanBakuModal}
        title="Delete BahanBaku Confirmation"
        bahanBakuData={selectedBahanBaku}
      />
    </div>
  );
}
