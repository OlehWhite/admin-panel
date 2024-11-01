import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { Website } from "../types/websites.types.ts";
import { DEFAULT_WEBSITE, ROLES } from "../services/constants.ts";

import { generateId } from "../services/utils.ts";
import { getCurrentUser, useGetWebsites } from "../store/getData.ts";
import { saveProjectsToFirestore } from "../store/updateProjects.ts";

import Layout from "../components/Layout.tsx";
import Loader from "../components/Loader.tsx";
import Main from "../components/website/Main.tsx";
import Blogs from "../components/website/blogs/Blogs.tsx";
import Button from "../components/shared/Button.tsx";
import Schedule from "../components/website/Schedule.tsx";
import Providers from "../components/website/Providers.tsx";
import Locations from "../components/website/Locations.tsx";
import OurPartners from "../components/website/OurPartners.tsx";
import HeaderImages from "../components/website/HeaderImages.tsx";
import SocialsMedia from "../components/website/SocialsMedia.tsx";
import ModalDeleteConfirmWebsite from "../components/modals/ModalDeleteConfirmWebsite.tsx";
import Languages from "../components/website/Languages.tsx";
import Video from "../components/website/Video.tsx";

const WebSite = () => {
  const { id } = useParams();
  const { id: uid } = generateId();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const { websites } = useGetWebsites();

  const [stateWebsite, setStateWebsite] = useState<Website>(DEFAULT_WEBSITE);
  const [open, setOpen] = useState<boolean>(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false,
  );

  useEffect(() => {
    if (websites) {
      const website = Object.entries(websites).reduce<Website>(
        (acc, [_, project]) => {
          const foundWebsite = Object.entries(project).find(
            ([_, website]) => website.id === id,
          );
          return foundWebsite ? foundWebsite[1] : acc;
        },
        DEFAULT_WEBSITE,
      );

      setStateWebsite(website);
    }
  }, [websites, id]);

  const handleSave = async () => {
    const arrayWebsites = Object.entries(websites).map(([_, project]) =>
      Object.entries(project).map(([, website]) => website),
    );

    const flatWebsites = arrayWebsites.flat();

    const updateWebsites = flatWebsites.reduce<Record<string, Website>>(
      (acc, website) => {
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
      },
      {},
    );

    try {
      if (!id) {
        const newKeyName = stateWebsite.keyName;
        await saveProjectsToFirestore({
          ...updateWebsites,
          [newKeyName]: {
            ...stateWebsite,
            id: uid,
          },
        });

        navigate("/");
      } else {
        await saveProjectsToFirestore(updateWebsites);
      }
    } catch (error) {
      console.error("Error request: ", error);
    }
  };

  const handleOpenModal = () => setOpen(true);

  const handleAccordionChange = (accordionId: string) => {
    setExpandedAccordion((prev) =>
      prev === accordionId ? false : accordionId,
    );
  };

  if (
    stateWebsite?.keyName === user?.name ||
    user?.name === ROLES.DEVELOPER ||
    user?.name === ROLES.SUPER_ADMIN
  ) {
    return (
      <Layout>
        <Typography
          variant="h5"
          fontWeight={600}
          color="rgb(55 152 210 / 98%)"
          sx={{ mb: 2 }}
          textAlign="center"
        >
          {stateWebsite.title || "Loading..."}
        </Typography>

        <Stack gap={1}>
          <Main
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() => handleAccordionChange("mainAccordion")}
          />

          {(user?.name === ROLES.DEVELOPER ||
            user?.name === ROLES.SUPER_ADMIN) && (
            <Languages
              stateWebsite={stateWebsite}
              setStateWebsite={setStateWebsite}
              expandedAccordion={expandedAccordion}
              handleAccordionChange={() =>
                handleAccordionChange("languagesAccordion")
              }
            />
          )}

          <Video
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() =>
              handleAccordionChange("videoAccordion")
            }
          />

          <Schedule
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() =>
              handleAccordionChange("scheduleAccordion")
            }
          />

          {(user?.name === ROLES.DEVELOPER ||
            user?.name === ROLES.SUPER_ADMIN) && (
            <HeaderImages
              stateWebsite={stateWebsite}
              setStateWebsite={setStateWebsite}
              expandedAccordion={expandedAccordion}
              handleAccordionChange={() =>
                handleAccordionChange("headerImagesAccordion")
              }
            />
          )}

          <SocialsMedia
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() =>
              handleAccordionChange("socialsMediaAccordion")
            }
          />

          <Blogs
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() =>
              handleAccordionChange("blogsAccordion")
            }
          />

          {(user?.name === ROLES.DEVELOPER ||
            user?.name === ROLES.SUPER_ADMIN) && (
            <Locations
              stateWebsite={stateWebsite}
              setStateWebsite={setStateWebsite}
              expandedAccordion={expandedAccordion}
              handleAccordionChange={() =>
                handleAccordionChange("locationsAccordion")
              }
            />
          )}

          {(user?.name === ROLES.DEVELOPER ||
            user?.name === ROLES.SUPER_ADMIN) && (
            <OurPartners
              stateWebsite={stateWebsite}
              setStateWebsite={setStateWebsite}
              expandedAccordion={expandedAccordion}
              handleAccordionChange={() =>
                handleAccordionChange("ourPartnersAccordion")
              }
            />
          )}

          <Providers
            stateWebsite={stateWebsite}
            setStateWebsite={setStateWebsite}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={() =>
              handleAccordionChange("providersAccordion")
            }
          />

          <Stack
            mt={4}
            direction="row"
            width="100%"
            justifyContent="space-between"
          >
            <Button
              value="Save"
              onClick={handleSave}
              disabled={!stateWebsite?.title}
              sx={{
                width: "100%",
                maxWidth: 300,
                height: 56,
              }}
            />

            {(user?.name === ROLES.DEVELOPER ||
              user?.name === ROLES.SUPER_ADMIN) && (
              <Button
                value="Delete"
                onClick={handleOpenModal}
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
        </Stack>

        <ModalDeleteConfirmWebsite
          open={open}
          setOpen={setOpen}
          websites={websites}
        />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
};

export default WebSite;
