import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { useState } from "react"
import Api from "../../../utils/Api"

export default function QuickAddLead({ refreshLeads }) {
  const [quickAddForm, setQuickAddForm] = useState({
    asin: "",
    cost: "",
    source_url: "",
  })
  const validate = async () => {}
  const handleSubmit = async () => {
    const isValid = await validate()
    const { isLoaded, error, result } = await Api.post(
      "http://localhost:3000/api/products/quickAdd",
      quickAddForm
    )
    if (isLoaded && !error) {
      setQuickAddForm({
        asin: "",
        cost: "",
        source_url: "",
      })

      refreshLeads({ order_by: "est_profit", order: "asc" })
    }
  }
  return (
    <Box>
      <FormControl>
        <InputLabel>ASIN</InputLabel>
        <OutlinedInput
          value={quickAddForm.asin}
          id="asin"
          label="ASIN"
          onChange={(e) =>
            setQuickAddForm({ ...quickAddForm, asin: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <InputLabel>Amount</InputLabel>
        <OutlinedInput
          value={quickAddForm.cost}
          id="cost"
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          label="Amount"
          onChange={(e) =>
            setQuickAddForm({ ...quickAddForm, cost: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <InputLabel>Source URL</InputLabel>
        <OutlinedInput
          value={quickAddForm.source_url}
          id="source_url"
          label="Source URL"
          onChange={(e) =>
            setQuickAddForm({ ...quickAddForm, source_url: e.target.value })
          }
        />
      </FormControl>
      <Button
        sx={{ margin: 1 }}
        variant="contained"
        onClick={(e) => handleSubmit()}
      >
        Add lead
      </Button>
    </Box>
  )
}
