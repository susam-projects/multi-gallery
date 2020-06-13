import React from "react";
import { useRouteMatch } from "react-router";
import { ICollectionViewerRouteParams } from "../CollectionViewer";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface ICollectionEditorRouteParams {
  slug: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  settings: {
    margin: theme.spacing(1, 0),
  },
}));

function CollectionEditorPage() {
  const match = useRouteMatch<ICollectionViewerRouteParams>();
  const { slug } = match.params;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <FormControl className={classes.formControl}>
          <TextField defaultValue={slug} label="Title" />
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select labelId="demo-simple-select-helper-label" defaultValue="">
            <MenuItem value="t1">Type 1</MenuItem>
            <MenuItem value="t2">Type 2</MenuItem>
            <MenuItem value="t3">Type 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.settings}>
        <Typography variant="h6">Settings</Typography>
        <div>
          <FormControl className={classes.formControl}>
            <TextField defaultValue={"ADKVPKKUDOERD5DKJVR"} label="Access Token" />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField label="Some Other Setting" />
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default CollectionEditorPage;
