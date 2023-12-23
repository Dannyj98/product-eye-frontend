import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Checkbox,
} from "@mui/material"
import { useState } from "react"
import Api from "../../../utils/Api"
import EnhancedTableToolbar from "./enhancedTableToolbar"
import EnhancedTableHead from "./enchancedTableHead"
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal"

export default function LeadTable({ leads, refreshLeads }) {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("est_profit")
  const [filter, setFilter] = useState({ order_by: "est_profit", order: "asc" })
  const [selected, setSelected] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const isSelected = (id) => selected.indexOf(id) !== -1

  const cancelDelete = () => {
    setOpenDeleteModal(false)
  }
  const handleDeleteConfirm = async () => {
    const { isLoaded, error, result } = await Api.delete(
      "http://localhost:3000/api/products",
      { data: { productIds: selected } }
    )
    if (isLoaded && !error) {
      refreshLeads(filter)
    } else if (error) {
      console.error(error)
    }
    setOpenDeleteModal(false)
  }
  const handleDelete = async () => {
    setOpenDeleteModal(true)
  }
  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = leads.map((n) => n._id)
      console.log(newSelected)
      console.log(selected)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
    setFilter({ filter: { order_by: orderBy, order: order } })
    refreshLeads(filter)
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={leads.length}
            />

            <TableBody>
              {leads.map((lead, index) => {
                const isItemSelected = isSelected(lead._id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    onClick={(event) => handleClick(lead._id)}
                    hover
                    role="checkbox"
                    selected={isItemSelected}
                    key={lead._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>
                      <a
                        href={`https://www.amazon.co.uk/dp/${lead.asin}`}
                        target="_blank"
                      >
                        {lead.asin}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://www.amazon.co.uk/dp/${lead.asin}`}
                        target="_blank"
                      >
                        {lead.asin}
                      </a>
                    </TableCell>
                    <TableCell>
                      {lead.best_source.cost ? lead.best_source.cost : "-"}
                    </TableCell>
                    <TableCell>
                      {lead.analysis.est_profit
                        ? lead.analysis.est_profit
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {lead.analysis.est_roi ? lead.analysis.est_roi : "-"}
                    </TableCell>
                    <TableCell>
                      {lead.analysis.score ? lead.analysis.score : "-"}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmDeleteModal
        open={openDeleteModal}
        cancel={cancelDelete}
        confirmDelete={handleDeleteConfirm}
      />
    </>
  )
}
