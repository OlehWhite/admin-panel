import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { getCurrentUser } from "../store/getData.ts";
import { auth } from "../store/login.ts";
import { VERIFY_KEY } from "../services/firebase.ts";
import { BREADCRUMBS_PROFILE, ROLES } from "../services/constants.ts";

import Layout from "../components/Layout.tsx";
import Button from "../components/shared/Button.tsx";

const Profile = () => {
  const navigate = useNavigate();
  const initialUser = getCurrentUser();

  const [user, setUser] = useState(initialUser);
  const [role, setRole] = useState<string>(user.name);
  const [access, setAccess] = useState<any>({ key: "", error: "" });

  useEffect(() => {
    setRole(user.name);
  }, [user]);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSave = async () => {
    try {
      if (VERIFY_KEY === access.key) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password,
        );

        await updateProfile(userCredential.user, { displayName: role });

        const updatedUser = { ...user, name: role };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
      } else {
        setAccess((prevSate) => ({
          ...prevSate,
          error: "Incorrect access key!",
        }));
      }
    } catch (error) {
      console.error("Error updating display name:", error.message);
    }
  };

  return (
    <Layout breadcrumbs={BREADCRUMBS_PROFILE}>
      <Stack gap={3}>
        <Stack direction="row" gap={3}>
          <FormControl sx={{ width: "100%", maxWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Roles</InputLabel>
            <Select value={role} label="Role" onChange={handleChange}>
              {Object.values(ROLES).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="password"
            label="Access key"
            type="Access key"
            multiline
            maxRows={1}
            value={access.key}
            onChange={(e) => {
              setAccess((prevState) => ({
                ...prevState,
                key: e.target.value,
              }));
            }}
            sx={{ width: "100%", maxWidth: 300 }}
          />
        </Stack>

        {access.error && <Typography color="red">{access.error}</Typography>}

        <Button
          value="Change"
          onClick={handleSave}
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 56,
          }}
        />
      </Stack>
    </Layout>
  );
};

export default Profile;
