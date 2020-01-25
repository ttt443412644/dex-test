import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles } from "@material-ui/core/styles";

import "./TablePanel.css";

type Order = "asc" | "desc";
type alignType = "left" | "right" | "center";

//список полей шапки
export interface IColumn {
  id: string;
  label: string;
  minWidth: number;
  align?: alignType;
  titleAlign?: alignType;
  canSort: boolean;
  format?: (value: number) => string;
  isRule?: boolean;
  resultElement?: (value?: any, href?: any) => JSX.Element;
}

export interface ITableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  columns: IColumn[];
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (
  a: { [key in K]: number | string },
  b: { [key in K]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function EnhancedTableHead(props: ITableProps) {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.titleAlign || "left"}
            style={{ minWidth: column.minWidth }}
            sortDirection={orderBy === column.id ? order : false}
          >
            {column.canSort ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              <span>{column.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ITablePanelProps {
  columns: IColumn[];
  data: any[];
  //  [key: string]: any;
  defOrderFieldName?: string;
  defOrderType?: Order;
}

export function TablePanel(props: ITablePanelProps) {
  const { columns, data, defOrderFieldName, defOrderType } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc" || defOrderType);
  const [orderBy, setOrderBy] = React.useState(defOrderFieldName || "id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className="listing-sub-container">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />

          <TableBody>
            {stableSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    {columns.map(column => {
                      const { resultElement, format, id, align } = column;
                      const value = row[id];

                      return (
                        <TableCell key={id} align={align || "left"}>
                          {resultElement
                            ? resultElement(value, row.id)
                            : format && typeof value === "number"
                            ? format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {//если кол-во записей больше 10, тогда отображаем панель пажинации
      data && data.length >= 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}

export default TablePanel;
