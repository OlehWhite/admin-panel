import Layout from "../components/Layout.tsx";
import { useState } from "react";
import { createUser } from "../store/createUser.ts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { getCurrentUser, useGetWebsites } from "../store/getData.ts";
import { ROLES } from "../services/constants.ts";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const { websites } = useGetWebsites();
  const user = getCurrentUser();

  const objectsWebsites = Object.entries(websites)?.[0]?.[1];
  const arrayWebsites = objectsWebsites
    ? Object.entries(objectsWebsites).map((website) => website[0])
    : [];

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createUser(email, password, name);

    navigate("/");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  if (!(user?.name === ROLES.SUPER_ADMIN || user?.name === ROLES.DEVELOPER)) {
    navigate("/");
  }

  return (
    <Layout userPage={true}>
      <form
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "24px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "#fff", width: 350 }}
          required
        />

        <TextField
          label="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ backgroundColor: "#fff", width: 350 }}
          required
        />

        <FormControl sx={{ width: "100%", maxWidth: 300, bgcolor: "#fff" }}>
          <InputLabel id="demo-simple-select-label">Websites*</InputLabel>

          <Select value={name} label="Websites*" onChange={handleChange}>
            {arrayWebsites?.map((role) => {
              if (typeof role !== "string" || role.length === 0) return null;

              return (
                <MenuItem key={role} value={role}>
                  {role
                    .toLowerCase()
                    .split("_")
                    .map((word) => {
                      // Перевірка, чи є слово непустим рядком
                      if (word.length === 0) return "";
                      return word[0].toUpperCase() + word.slice(1);
                    })
                    .join(" ")}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <button
          style={{
            width: "100%",
            maxWidth: 300,
            height: 56,
            fontSize: 17,
            background: "#000",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create User
        </button>
      </form>
    </Layout>
  );
};

export default User;
