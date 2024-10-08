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

  const handleAddNewBlog = () => {
    try {
      navigate(`/website/${id}/blogs`);
    } catch (error) {
      console.error("Can`t to create a new blog:", error);
    }
  };

  const handleOpenBlog = (blog: IBlog, idBlog: string) => {
    try {
      if (blog) {
        localStorage.setItem("blog", JSON.stringify(blog));
      }
      navigate(`/website/${id}/blogs/${idBlog}`);
    } catch (error) {
      console.error("Can`t to open the blog:", error);
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
            value="Add new blog"
            onClick={handleAddNewBlog}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.blogs.reverse().map((blog) => (
            <Stack
              key={blog.id}
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
              onClick={() => handleOpenBlog(blog, blog.id)}
            >
              <Stack
                component="img"
                src={blog.image}
                sx={{
                  width: 250,
                  objectFit: "cover",
                }}
              />
              <Stack gap={2} justifyContent="center">
                <Typography>{blog.title}</Typography>

                <Typography fontWeight={300} fontSize={14}>
                  {blog.date}
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
