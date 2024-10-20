import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Stack, Typography } from "@mui/material";

import { Website, WebsitesCollection } from "../../types/websites.types.ts";

import { saveProjectsToFirestore } from "../../store/updateProjects.ts";

import Button from "../shared/Button.tsx";

interface Props {
  open: boolean;
  setOpen: (e: boolean) => void;
  websites: WebsitesCollection;
}

const ModalDeleteConfirmWebsite = ({ open, setOpen, websites }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      if (id) {
        const updatedWebsites: Record<string, Website> = Object.entries(
          websites,
        ).reduce((acc: Record<string, Website>, [, project]) => {
          Object.entries(project).forEach(([websiteKey, website]) => {
            if (website.id !== id) {
              acc[websiteKey] = website;
            }
          });
          return acc;
        }, {});

        await saveProjectsToFirestore(updatedWebsites);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting website: ", error);
    }
  };

  const handleCancel = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth={false}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 350,
        },
      }}
    >
      <Stack bgcolor="#f6ffff" p={2} gap={3} textAlign="center">
        <Typography fontSize={18}>
          Do you really want to delete this website?
        </Typography>

        <Stack direction="row" justifyContent="space-around">
          <Button value="Cancel" onClick={handleCancel} />

          <Button value="Delete" color="error" onClick={handleDelete} />
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ModalDeleteConfirmWebsite;
