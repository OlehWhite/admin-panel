import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Stack, Typography } from "@mui/material";

import {
  Project,
  Website,
  WebsitesCollection,
} from "../../types/websites.types.ts";

import { saveProjectsToFirestore } from "../../store/updateProjects.ts";

import Button from "../shared/Button.tsx";

interface Props {
  stateWebsite: Website;
  open: boolean;
  setOpen: (e: boolean) => void;
  websites: WebsitesCollection;
}

const ModalDeleteConfirmBlog = ({
  stateWebsite,
  open,
  setOpen,
  websites,
}: Props) => {
  const navigate = useNavigate();
  const { id, idBlog } = useParams();

  const handleDelete = async () => {
    const arrayWebsites = Object.entries(websites).map(([_, project]) =>
      Object.entries(project).map(([, website]) => website),
    );

    const flatWebsites = arrayWebsites.flat();

    const updateWebsites: Project = flatWebsites.reduce((acc, website) => {
      if (website.id === id) {
        acc[website.keyName] = {
          ...stateWebsite,
          blogs: stateWebsite.blogs.filter((oldBlog) => oldBlog.id !== idBlog),
        };
      } else {
        acc[website.keyName] = {
          ...website,
        };
      }
      return acc;
    }, {} as Project);

    try {
      await saveProjectsToFirestore(updateWebsites);
      navigate(`/website/${id}`);
    } catch (error) {
      console.error("Error deleting blog: ", error);
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
          Do you really want to delete this blog?
        </Typography>

        <Stack direction="row" justifyContent="space-around">
          <Button value="Cancel" onClick={handleCancel} />

          <Button value="Delete" color="error" onClick={handleDelete} />
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ModalDeleteConfirmBlog;
