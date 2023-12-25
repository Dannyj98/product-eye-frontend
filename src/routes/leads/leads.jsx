import { useEffect, useState } from "react"
import Api from "../../utils/Api"
import LeadTable from "./_partials/leadTable"
import QuickAddLead from "./_partials/quickAddLead"

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [isLoaded, setIsLoaded] = useState()

  useEffect(() => {
    getLeads({ order_by: "est_profit", order: "asc" })
  }, [])

  const getLeads = async (filter) => {
    const { isLoaded, error, result } = await Api.get(
      "http://localhost:3000/api/products",
      filter
    )

    if (isLoaded && !error) {
      setLeads(result.data.items)
      setIsLoaded(isLoaded)
    } else {
    }
  }

  return (
    <>
      <QuickAddLead refreshLeads={getLeads} />
      {isLoaded ? (
        <LeadTable leads={leads} refreshLeads={getLeads} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
