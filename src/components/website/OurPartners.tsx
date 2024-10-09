import { ChangeEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { IWebsiteState } from "../../types/websites.types.ts";
import emptyImag from "../../assets/empty-img.png";

import Button from "../shared/Button.tsx";

const OurPartners = ({ stateWebsite, setStateWebsite }: IWebsiteState) => {
  const handleAddNewPartner = () => {
    setStateWebsite((prevState) => ({
      ...prevState,
      ourPartners: [
        ...prevState.ourPartners,
        { link: "", title: "", image: "" },
      ],
    }));
  };

  const handleChangeTitle = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const newPartnerImages = [...stateWebsite.ourPartners];

    newPartnerImages[index] = {
      ...newPartnerImages[index],
      title: e.target.value,
    };

    setStateWebsite((prevState) => ({
      ...prevState,
      ourPartners: newPartnerImages,
    }));
  };

  const handleChangeLink = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const newPartnerImages = [...stateWebsite.ourPartners];

    newPartnerImages[index] = {
      ...newPartnerImages[index],
      link: e.target.value,
    };

    setStateWebsite((prevState) => ({
      ...prevState,
      ourPartners: newPartnerImages,
    }));
  };

  const handleRemovePartner = (index: number) => {
    const newPartnerImages = [...stateWebsite.ourPartners];

    newPartnerImages.splice(index, 1);

    setStateWebsite((prevState) => ({
      ...prevState,
      ourPartners: newPartnerImages,
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

      const newPartnerImages = [...stateWebsite.ourPartners];

      newPartnerImages[index] = {
        ...newPartnerImages[index],
        image: url,
      };

      setStateWebsite((prevState) => ({
        ...prevState,
        ourPartners: newPartnerImages,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="our-partners"
        id="our-partners"
      >
        <Typography fontSize={20}>
          Our partners{" "}
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            ( Image, Link )
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack direction="row" justifyContent="center">
          <Button
            value="Add new partner"
            onClick={handleAddNewPartner}
            sx={{
              width: "100%",
              maxWidth: 300,
              height: 56,
              mb: 3,
            }}
          />
        </Stack>

        <Stack flexWrap="wrap" width="100%" gap={3.6}>
          {stateWebsite?.ourPartners
            .map((item, index) => (
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
                    width: 330,
                    objectFit: "cover",
                    p: 1,
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
                    value="Remove this partner"
                    color="error"
                    onClick={() => handleRemovePartner(index)}
                  />
                </Stack>

                <Stack width="100%" maxWidth={720} gap={3}>
                  <TextField
                    label="Title"
                    type="text"
                    value={item.title}
                    onChange={(e) => handleChangeTitle(e, index)}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />

                  <TextField
                    label="Link"
                    type="url"
                    value={item.link}
                    onChange={(e) => handleChangeLink(e, index)}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />
                </Stack>
              </Stack>
            ))
            .reverse()}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default OurPartners;
