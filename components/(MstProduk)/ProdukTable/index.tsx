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
import { DataProduk } from "@/interfaces/ProdukInterface";
import { columns } from "@/utils/columnsTable/dataProduk";
import apiGetProduk from "@/service/api/apiProduk";
import AddProdukModal from "../AddProdukModal";
import ViewProdukModal from "../ViewProdukModal";
import DeleteProdukModal from "../DeleteProdukModal";
import EditProdukModal from "../EditProdukModal";

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "kategori",
  "kuota_harian",
  "harga",
  "gambar",
  "actions",
];

export default function ProdukTable() {
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

  const [produks, setProduks] = useState<DataProduk[]>([]);

  //handlerModal

  //add Modal
  const [selectedProduk, setSelectedProduk] = useState<DataProduk | null>(null);
  const {
    isOpen: isAddProdukModalOpen,
    onOpenChange: onAddProdukModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isViewProdukModalOpen,
    onOpenChange: onViewProdukModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteProdukModalOpen,
    onOpenChange: onDeleteProdukModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditProdukModalOpen,
    onOpenChange: onEditProdukModalOpenChange,
  } = useDisclosure();

  const openProdukDetailsModal = (produks: DataProduk) => {
    setSelectedProduk(produks);
    onViewProdukModalOpenChange();
  };
  const openProdukDeleteModal = (produks: DataProduk) => {
    setSelectedProduk(produks);
    onDeleteProdukModalOpenChange();
  };
  const openProdukEditModal = (produks: DataProduk) => {
    setSelectedProduk(produks);
    onEditProdukModalOpenChange();
  };
  const onCloseDetailProdukModal = () => {
    setSelectedProduk(null);
    onViewProdukModalOpenChange();
  };
  const onCloseDeleteProdukModal = () => {
    setSelectedProduk(null);
    onDeleteProdukModalOpenChange();
  };
  const onCloseEditProdukModal = () => {
    setSelectedProduk(null);
    onEditProdukModalOpenChange();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiGetProduk();
        // console.log(response.data.data);
        setProduks(response.data.data);
      } catch (error) {
        // console.log(error)
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = Math.ceil(produks.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProduks = [...produks];

    if (hasSearchFilter) {
      filteredProduks = filteredProduks.filter((user) =>
        user.name.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProduks;
  }, [produks, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: DataProduk, b: DataProduk) => {
      const first = a[sortDescriptor.column as keyof DataProduk] as number;
      const second = b[sortDescriptor.column as keyof DataProduk] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = React.useCallback(
    (produk: DataProduk, columnKey: React.Key) => {
      const cellValue = produk[columnKey as keyof DataProduk];

      switch (columnKey) {
        case "id":
          return <div>{produk.id}</div>;
        case "kelipatan":
          return <div> {produk.name}</div>;
        case "bonus_poin":
          return <div>{produk.harga}</div>;

        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <Tooltip
                content="Details"
                className="p-1.5 border rounded-lg bg-white border-blue-600"
              >
                <span
                  onClick={() => openProdukDetailsModal(produk)}
                  className="text-xl text-blue-600 cursor-pointer active:opacity-50"
                >
                  <IconFilledEye />
                </span>
              </Tooltip>
              <Tooltip
                color="success"
                className="p-1.5 rounded-lg border border-white"
                content="Edit produk"
              >
                <span
                  onClick={() => openProdukEditModal(produk)}
                  className="text-xl text-success cursor-pointer active:opacity-50"
                >
                  <IconEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" className="p-1.5" content="Delete produk">
                <span
                  onClick={() => openProdukDeleteModal(produk)}
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
              onClick={onAddProdukModalOpenChange}
              className="bg-[#0370C3] text-background"
              endContent={<PlusIcon />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-medium">Total {produks.length} produks</span>
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
    produks.length,
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
      <h2 className="text-2xl font-semibold pb-4">Master produk</h2>
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
      <AddProdukModal
        isOpen={isAddProdukModalOpen}
        onClose={onAddProdukModalOpenChange}
        title="Add produk"
      />
      <ViewProdukModal
        isOpen={isViewProdukModalOpen}
        onClose={onCloseDetailProdukModal}
        title="produk Details"
        produkData={selectedProduk}
      />
      <DeleteProdukModal
        isOpen={isDeleteProdukModalOpen}
        onClose={onCloseDeleteProdukModal}
        title="Delete produk Confirmation"
        produkData={selectedProduk}
      />
      <EditProdukModal
        isOpen={isEditProdukModalOpen}
        onClose={onCloseEditProdukModal}
        title="Delete produk Confirmation"
        produkData={selectedProduk}
      />
    </div>
  );
}
