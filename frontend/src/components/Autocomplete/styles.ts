import { Autocomplete, TextField, styled } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormHelperText-root": {
    marginLeft: "0",
  },
  ".MuiChip-deletableColorDefault": {
    color: theme.palette.secondary.main,
    "& svg": {
      color: "#f1f1f1",
    },
  },
  "&.MuiTextField-root": {
    "&:hover": {
      "& .MuiFormLabel-root": {
        color: "#000",
        "&.Mui-disabled": {
          color: "#000",
        },
      },
    },
  },
  "& .MuiOutlinedInput-root": {
    "& svg": {
      fill: "#f1f1f1",
    },
    "&.Mui-disabled": {
      color: "#f1f1f1",
    },
  },
  "& .MuiFormLabel-root": {
    "&.Mui-disabled": {
      color: "#f1f1f1",
      opacity: 0.5,
    },
  },
}));

export const CustomAutocomplete = styled(Autocomplete)(() => ({
  "& + .MuiAutocomplete-popper .MuiAutocomplete-paper": {
    marginTop: "4px",
    border: "0.5px solid #f1f1f1",
  },

  "& + .MuiAutocomplete-popper .MuiAutocomplete-listbox": {
    paddingTop: 0,
    paddingBottom: 0,
  },

  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
    borderBottom: "1px solid #f1f1f1",
    color: "#000",

    "&:last-child": {
      borderBottom: "none",
    },
  },
}));
