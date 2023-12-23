import { Modal, Box, Typography, Button } from "@mui/material"

export default function ConfirmDeleteModal(props) {
  const { open, cancel, confirmDelete } = props
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "20%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  }
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography variant="h5">Confirm delete</Typography>
        <Typography>By pressing delete all data will be removed.</Typography>
        <Box sx={{ margin: 2 }}>
          <Button
            sx={{ margin: 2 }}
            vriantt="outlined"
            onClick={() => cancel()}
          >
            Cancel
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="error"
            onClick={() => confirmDelete()}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
