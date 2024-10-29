import { IWebsiteState } from "../../types/websites.types.ts";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../shared/Button.tsx";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";

const MAX_VIDEO_SIZE_MB = 50;

const Video = ({
  stateWebsite,
  setStateWebsite,
  expandedAccordion,
  handleAccordionChange,
}: IWebsiteState) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const uploadVideoToFirebase = async (file: File, index: any) => {
    if (file.size / 1024 / 1024 > MAX_VIDEO_SIZE_MB) {
      alert(`File size exceeds ${MAX_VIDEO_SIZE_MB} MB`);
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `videos/${file.name}?${index}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => console.error("Error uploading video: ", error),
      async () => {
        const url = await getDownloadURL(storageRef);
        setUploadProgress(null);

        // Update the state with the video URL
        setStateWebsite((prevState) => ({
          ...prevState,
          video: url,
        }));
      },
    );
  };

  const uploadImageToFirebase = async (file: File, index: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}?${index}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setStateWebsite((prevState) => ({
        ...prevState,
        videoIcon: url,
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: any,
  ) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      uploadImageToFirebase(file, index);
    }
  };

  const handleMediaChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: any,
  ) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      uploadVideoToFirebase(file, index);
    }
  };

  return (
    <Accordion
      expanded={expandedAccordion === "videoAccordion"}
      onChange={handleAccordionChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="video"
        id="video"
      >
        <Typography fontSize={20}>
          Video
          <Box component="span" fontSize={16} fontWeight={200}>
            {" "}
            (Preview image, video)
          </Box>
        </Typography>
      </AccordionSummary>

      <Box borderBottom="1px solid #BEBEBE" mb={2} />

      <AccordionDetails>
        <Stack direction="row" justifyContent="space-between">
          <Stack width={1} maxWidth={600}>
            <Button
              value="Add video preview image"
              onClick={() => document.getElementById("preview-input")?.click()}
            />
            <input
              id="preview-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, new Date())}
            />

            {stateWebsite?.videoIcon && (
              <Box
                mt={3}
                component="img"
                src={stateWebsite?.videoIcon}
                alt="Preview"
                width="100%"
                maxWidth={600}
              />
            )}
          </Stack>

          <Stack width={1} maxWidth={600}>
            <Button
              value="Upload Video"
              onClick={() => document.getElementById("video-input")?.click()}
            />
            <input
              id="video-input"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => handleMediaChange(e, new Date())}
            />

            {uploadProgress !== null && (
              <Box mt={3}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography>{Math.round(uploadProgress)}%</Typography>
              </Box>
            )}

            {stateWebsite?.video && (
              <Box component="video" controls width={1} maxWidth={600} mt={3}>
                <source src={stateWebsite?.video} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            )}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Video;
