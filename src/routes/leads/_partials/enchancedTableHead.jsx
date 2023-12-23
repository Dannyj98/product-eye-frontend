import {
  TableHead,
  TableRow,
  Checkbox,
  TableCell,
  TableSortLabel,
  Box,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"

export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "asin", numeric: false, disablePadding: false, label: "ASIN" },
    { id: "source", numeric: false, disablePadding: false, label: "Source" },
    {
      id: "analysis.cost",
      numeric: true,
      disablePadding: false,
      label: "Cost",
    },
    {
      id: "analysis.est_profit",
      numeric: true,
      disablePadding: false,
      label: "Est Profit",
    },
    {
      id: "analysis.est_roi",
      numeric: true,
      disablePadding: false,
      label: "Est R.O.I (%)",
    },
    {
      id: "analysis.score",
      numeric: true,
      disablePadding: false,
      label: "Score",
    },
  ]

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
