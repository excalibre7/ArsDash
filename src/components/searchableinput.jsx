/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchableInput(props) {
  const { lbl, data, sub, setting, par } = props;

  const onSelect = (event, value) => {
    setting(par, value[sub]);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={data}
      getOptionLabel={(option) => option[sub]}
      //   onInputChange={onInputChange}
      onChange={onSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label={lbl}
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
