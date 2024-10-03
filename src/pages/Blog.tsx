import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { PickerValidDate } from "@mui/x-date-pickers";

import { DEFAULT_BLOG, DEFAULT_WEBSITE } from "../services/constants.ts";
import { generateId } from "../services/utils.ts";
import { IBlog, Project, Website } from "../types/websites.types.ts";
import { useGetWebsites } from "../store/getData.ts";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

import emptyImag from "../assets/empty-img.png";

import Button from "../components/shared/Button.tsx";
import Layout from "../components/Layout.tsx";

const Blog = () => {
  const { id: uid } = generateId();
  const { id, idBlog } = useParams();
  const navigate = useNavigate();

  const { websites } = useGetWebsites();
  const storeBlogString = localStorage.getItem("blog");
  const storeBlog = storeBlogString
    ? JSON.parse(storeBlogString)
    : DEFAULT_BLOG;

  const [stateWebsite, setStateWebsite] = useState<Website>(DEFAULT_WEBSITE);
  const [blog, setBlog] = useState<IBlog>(DEFAULT_BLOG);

  useEffect(() => {
    if (idBlog) {
      setBlog(storeBlog);
    } else {
      setBlog((prevState) => ({
        ...prevState,
        id: uid,
      }));
    }
  }, []);

  useEffect(() => {
    if (websites) {
      const website = Object.entries(websites).reduce((acc, [, project]) => {
        const foundWebsite = Object.entries(project).find(
          ([, website]) => website.id === id,
        );
        return foundWebsite ? foundWebsite[1] : acc;
      }, DEFAULT_WEBSITE as Website);

      if (website) {
        setStateWebsite(website);
      }
    }
  }, [websites, id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      setBlog((prevState) => ({
        ...prevState,
        image: url,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format("MMMM D, YYYY");
      setBlog((prevState) => ({
        ...prevState,
        date: formattedDate,
      }));
    }
  };

  const handleSave = async () => {
    const arrayWebsites = Object.entries(websites).map(([_, project]) =>
      Object.entries(project).map(([, website]) => website),
    );

    const flatWebsites = arrayWebsites.flat();

    const updateWebsites: Project = flatWebsites.reduce((acc, website) => {
      if (website.id === id) {
        acc[website.keyName] = {
          ...stateWebsite,
        };
      } else {
        acc[website.keyName] = {
          ...website,
        };
      }
      return acc;
    }, {} as Project);

    const newKeyName = stateWebsite.keyName;

    try {
      if (!idBlog) {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            blogs: [...stateWebsite.blogs, blog],
          },
        });
      } else {
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            blogs: [
              ...stateWebsite?.blogs.map((oldBlog) => {
                if (oldBlog.id === idBlog) {
                  return blog;
                } else {
                  return oldBlog;
                }
              }),
            ],
          },
        });
      }

      navigate(`/website/${id}`);
    } catch (error) {
      console.error("Error request: ", error);
    }
  };

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

  return (
    <Layout>
      <Stack
        boxShadow="0px 0px 13px 0px #000000a8"
        borderRadius={2}
        overflow="hidden"
        p={3}
      >
        <Stack direction="row" alignItems="center" gap={3}>
          <Box
            component="img"
            src={blog?.image ? blog?.image : emptyImag}
            alt={blog?.title}
            sx={{
              width: "100%",
              maxWidth: 500,
              height: 270,
              objectFit: "cover",
            }}
          />

          <Stack direction="column" gap={3} width="100%">
            <Stack direction="row" gap={3}>
              <Button
                value={blog?.image ? "Update photo" : "Add photo"}
                color="info"
                onClick={() =>
                  document.getElementById(`file-input-${blog.id}`)?.click()
                }
                sx={{
                  height: 56,
                }}
              />

              <input
                id={`file-input-${blog.id}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a date"
                  value={
                    (dayjs(blog.date) as unknown as PickerValidDate) || null
                  }
                  onChange={handleDateChange}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                />
              </LocalizationProvider>
            </Stack>

            <TextField
              id="title"
              label="Title"
              type="text"
              value={blog?.title}
              onChange={(e) => {
                setBlog((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Stack>
        </Stack>

        <Stack gap={3} mt={3}>
          {blog?.text.map((textItem, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={1}>
              <TextField
                label="Paragraph"
                type="text"
                value={textItem}
                multiline
                rows={4}
                onChange={(e) => {
                  const updatedText = [...blog.text];
                  updatedText[index] = e.target.value;
                  setBlog((prevState) => ({
                    ...prevState,
                    text: updatedText,
                  }));
                }}
                sx={{ backgroundColor: "#fff", flex: 1 }}
                InputProps={{
                  sx: {
                    height: 130,
                    alignItems: "flex-start",
                  },
                }}
              />

              <Button
                variant="contained"
                value="Delete pharagraph"
                color="error"
                onClick={() => {
                  const updatedText = blog.text.filter((_, i) => i !== index);
                  setBlog((prevState) => ({
                    ...prevState,
                    text: updatedText,
                  }));
                }}
                sx={{
                  height: 56,
                }}
              />
            </Stack>
          ))}

          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              value="Add new pharagraph"
              onClick={() => {
                setBlog((prevState) => ({
                  ...prevState,
                  text: [...prevState.text, "New Paragraph"],
                }));
              }}
              sx={{
                width: "100%",
                maxWidth: 300,
                height: 56,
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack mt={4} direction="row" width="100%" justifyContent="space-between">
        <Button
          value="Save"
          onClick={handleSave}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 56,
          }}
        />

        {idBlog && (
          <Button
            value="Delete this blog"
            onClick={handleDelete}
            color="error"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
            }}
          />
        )}
      </Stack>
    </Layout>
  );
};

export default Blog;
