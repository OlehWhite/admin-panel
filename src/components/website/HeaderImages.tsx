import { ChangeEvent } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import emptyImag from "../../assets/empty-img.png";
import { IWebsiteState } from "../../types/websites.types.ts";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from "../shared/Button.tsx";

const HeaderImages = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const handleAddNewBlock = () => {
    setStateWebsite((prevState) => ({
      ...prevState,
      headerImages: [
        ...prevState.headerImages,
        { image: "", title: "", text: "" },
      ],
    }));
  };

  const handleRemoveBlock = (index: number) => {
    const newHeaderImages = [...stateWebsite.headerImages];

    newHeaderImages.splice(index, 1);

    setStateWebsite((prevState) => ({
      ...prevState,
      headerImages: newHeaderImages,
    }));
  };

  const handleChangeTitle = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const newHeaderImages = [...stateWebsite.headerImages];

    newHeaderImages[index] = {
      ...newHeaderImages[index],
      title: e.target.value,
    };

    setStateWebsite((prevState) => ({
      ...prevState,
      headerImages: newHeaderImages,
    }));
  };

  const handleChangeText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const newHeaderImages = [...stateWebsite.headerImages];

    newHeaderImages[index] = {
      ...newHeaderImages[index],
      text: e.target.value,
    };

    setStateWebsite((prevState) => ({
      ...prevState,
      headerImages: newHeaderImages,
    }));
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      uploadImageToFirebase(file, index);
    }
  };

  const uploadImageToFirebase = async (file: File, index: number) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const newHeaderImages = [...stateWebsite.headerImages];

      newHeaderImages[index] = {
        ...newHeaderImages[index],
        image: url,
      };

      setStateWebsite((prevState) => ({
        ...prevState,
        headerImages: newHeaderImages,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="header-images"
        id="header-images"
      >
        <Typography fontSize={20}>
          Header images
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Title, Text )
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

        <Stack direction="column" flexWrap="wrap" gap={3.6}>
          {stateWebsite?.headerImages.reverse().map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              gap={3}
              boxShadow="0px 0px 13px 0px #000000a8"
              borderRadius={2}
              overflow="hidden"
            >
              <Box
                component="img"
                src={item.image ? item.image : emptyImag}
                alt={item.image + index}
                title={item.image + index}
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: 270,
                  objectFit: "cover",
                }}
              />

              <Stack gap={2}>
                <Button
                  value={item.image ? "Update photo" : "Add photo"}
                  color="info"
                  onClick={() =>
                    document
                      .getElementById(`file-input-${item.image + 1}`)
                      ?.click()
                  }
                />

                <input
                  id={`file-input-${item.image + 1}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, index)}
                />

                <Button
                  value="Remove this block"
                  color="error"
                  onClick={() => handleRemoveBlock(index)}
                />
              </Stack>

              <Stack width="100%" maxWidth={640} gap={3}>
                <TextField
                  id="title"
                  label="Title"
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChangeTitle(e, index)}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                />

                <TextField
                  id="text"
                  label="Text"
                  multiline
                  rows={3}
                  value={item.text}
                  onChange={(e) => handleChangeText(e, index)}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                  InputProps={{
                    sx: {
                      height: 100,
                      alignItems: "flex-start",
                    },
                  }}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default HeaderImages;
