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
import { DataPembelianBahanBaku } from "@/interfaces/PembelianBahanBaku";
import apiGetPembelianBahanBaku from "@/service/api/apiPembelianBahanBaku";
import AddPembelianBahanBakuModal from "../AddPembelianBahanBakuModal";
import ViewBahanBakuModal from "@/components/(MstBahanBaku)/ViewBahanBakuModal";
import ViewPembelianBahanBakuModal from "../ViewPembelianBahanBakuModal";
import EditPembelianBahanBakuForm from "../EditPembelianBahanBakuForm";
import EditPembelianBahanBakuModal from "../EditPembelianBahanBakuModal";
import DeletePembelianBahanBakuModal from "../DeletePembelianBahanBakuModal";
import { columns } from "@/utils/columnsTable/dataPembelianBahanBaku";

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "jabatan", "actions"];

export default function PembelianBahanBakuTable() {
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
  const [pembelians, setPembelians] = useState<DataPembelianBahanBaku[]>([]);

  const {
    isOpen: isAddPembelianBahanBakuModalOpen,
    onOpenChange: onAddPembelianBahanBakuModalOpenChange,
  } = useDisclosure();

  const [selectedPembelianBahanBaku, setSelectedPembelianBahanBaku] =
    useState<DataPembelianBahanBaku | null>(null);
  // View PembelianBahanBaku Modal
  const {
    isOpen: isViewPembelianBahanBakuModalOpen,
    onOpenChange: onViewPembelianBahanBakuModalOpenChange,
  } = useDisclosure();

  // Open Pembelian Bahan Baku Details Modal
  const openPembelianBahanBakuDetailsModal = (
    pembelians: DataPembelianBahanBaku
  ) => {
    setSelectedPembelianBahanBaku(pembelians);
    onViewPembelianBahanBakuModalOpenChange();
  };

  // Close PembelianBahanBaku Details Modal
  const onClosePembelianBahanBakuModal = () => {
    setSelectedPembelianBahanBaku(null);
    onViewPembelianBahanBakuModalOpenChange();
  };

  // Edit PembelianBahanBaku modal
  const {
    isOpen: isEditPembelianBahanBakuModalOpen,
    onOpenChange: onEditPembelianBahanBakuModalOpenChange,
  } = useDisclosure();

  // Selected PembelianBahanBaku
  const openPembelianBahanBakuEditModal = (
    pembelians: DataPembelianBahanBaku
  ) => {
    setSelectedPembelianBahanBaku(pembelians);
    onEditPembelianBahanBakuModalOpenChange();
  };

  // Close Edit PembelianBahanBaku Modal
  const onCloseEditPembelianBahanBakuModal = () => {
    setSelectedPembelianBahanBaku(null);
    onEditPembelianBahanBakuModalOpenChange();
  };

  // Delete PembelianBahanBaku Modal
  const {
    isOpen: isDeletePembelianBahanBakuModalOpen,
    onOpenChange: onDeletePembelianBahanBakuModalOpenChange,
  } = useDisclosure();

  const openPembelianBahanBakuDeleteModal = (
    pembelians: DataPembelianBahanBaku
  ) => {
    setSelectedPembelianBahanBaku(pembelians);
    onDeletePembelianBahanBakuModalOpenChange();
  };

  const onCloseDeletePembelianBahanBakuModal = () => {
    setSelectedPembelianBahanBaku(null);
    onDeletePembelianBahanBakuModalOpenChange();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiGetPembelianBahanBaku();
        setPembelians(response.data.data);
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = Math.ceil(pembelians.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPembelians = [...pembelians];

    if (hasSearchFilter) {
      filteredPembelians = filteredPembelians.filter((pembelian) =>
        pembelian.bahan_baku.name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredPembelians;
  }, [pembelians, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort(
      (a: DataPembelianBahanBaku, b: DataPembelianBahanBaku) => {
        const first = a[
          sortDescriptor.column as keyof DataPembelianBahanBaku
        ] as number;
        const second = b[
          sortDescriptor.column as keyof DataPembelianBahanBaku
        ] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (pembelian: DataPembelianBahanBaku, columnKey: React.Key): ReactNode => {
      const cellValue = pembelian[columnKey as keyof DataPembelianBahanBaku];

      switch (columnKey) {
        case "id":
          return <div>{pembelian.id}</div>;
        case "name":
          return <div>{pembelian.bahan_baku.name}</div>;
        case "jumlah":
          return <div>{pembelian.jumlah}</div>;
        case "name":
          return <div>{pembelian.total_harga}</div>;
        case "jumlah":
          return <div>{pembelian.waktu.toDateString()}</div>;
        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <Tooltip
                content="Details"
                className="p-1.5 border rounded-lg bg-white border-blue-600"
              >
                <span
                  onClick={() => openPembelianBahanBakuDetailsModal(pembelian)}
                  className="text-xl text-blue-600 cursor-pointer active:opacity-50"
                >
                  <IconFilledEye />
                </span>
              </Tooltip>
              <Tooltip
                color="success"
                className="p-1.5 rounded-lg border border-white"
                content="Edit Pembelian Bahan Baku"
              >
                <span
                  onClick={() => openPembelianBahanBakuEditModal(pembelian)}
                  className="text-xl text-success cursor-pointer active:opacity-50"
                >
                  <IconEdit />
                </span>
              </Tooltip>
              <Tooltip
                color="danger"
                className="p-1.5"
                content="Delete Pembelian Bahan Baku"
              >
                <span
                  onClick={() => openPembelianBahanBakuDeleteModal(pembelian)}
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
              onClick={onAddPembelianBahanBakuModalOpenChange}
              className="bg-[#0370C3] text-background"
              endContent={<PlusIcon />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-medium">
            Total {pembelians.length} Pembelian Bahan Baku
          </span>
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
    pembelians.length,
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
        <h2 className="text-2xl font-semibold pb-4">
          Master Pembelian Bahan Baku
        </h2>
        <Table
          isCompact
          removeWrapper
          aria-label="Data Table Pembelian Bahan Baku "
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
          <TableBody
            emptyContent={"No Pembelian Bahan Baku found"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <AddPembelianBahanBakuModal
          isOpen={isAddPembelianBahanBakuModalOpen}
          onClose={onAddPembelianBahanBakuModalOpenChange}
          title="Add User"
        />
        <ViewPembelianBahanBakuModal
          isOpen={isViewPembelianBahanBakuModalOpen}
          onClose={onClosePembelianBahanBakuModal}
          title="Pembelian Details"
          pembelianData={selectedPembelianBahanBaku}
        />
        <EditPembelianBahanBakuModal
          isOpen={isEditPembelianBahanBakuModalOpen}
          onClose={onCloseEditPembelianBahanBakuModal}
          title="Edit Pembelian Confirmation"
          pembelianData={selectedPembelianBahanBaku}
        />
        <DeletePembelianBahanBakuModal
          isOpen={isDeletePembelianBahanBakuModalOpen}
          onClose={onCloseDeletePembelianBahanBakuModal}
          title="Delete Pembelian Confirmation"
          pembelianData={selectedPembelianBahanBaku}
        />
      </div>
    </div>
  );
}
