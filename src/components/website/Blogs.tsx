import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IBlog, IWebsiteState } from "../../types/websites.types.ts";
import Button from "../shared/Button.tsx";

const Blogs = ({ stateWebsite }: IWebsiteState) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddNewBlock = () => {
    try {
      navigate(`/website/${id}/blogs`);
    } catch (error) {
      console.error("Can`t to create a new block:", error);
    }
  };

  const handleOpenBlock = (block: IBlog, idBlock: string) => {
    try {
      if (block) {
        localStorage.setItem("blog", JSON.stringify(block));
      }
      navigate(`/website/${id}/blogs/${idBlock}`);
    } catch (error) {
      console.error("Can`t to open the block:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="blogs"
        id="blogs"
      >
        <Typography fontSize={20}>
          Blogs{" "}
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Title, Text, Link )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack direction="row" justifyContent="center">
          <Button
            value="Add new block"
            onClick={handleAddNewBlock}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.blogs.reverse().map((block) => (
            <Stack
              key={block.id}
              sx={{
                cursor: "pointer",
                transition: ".5s",

                ":hover": {
                  transition: ".5s",
                  backgroundColor: "#a6eaf37a",
                },
              }}
              direction="row"
              flexWrap="wrap"
              gap={3}
              boxShadow="0px 0px 13px 0px #000000a8;"
              borderRadius={2}
              overflow="hidden"
              height={150}
              onClick={() => handleOpenBlock(block, block.id)}
            >
              <Stack
                component="img"
                src={block.image}
                sx={{
                  width: 250,
                  objectFit: "cover",
                }}
              />
              <Stack gap={2} justifyContent="center">
                <Typography>{block.title}</Typography>

                <Typography fontWeight={300} fontSize={14}>
                  {block.date}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Blogs;
