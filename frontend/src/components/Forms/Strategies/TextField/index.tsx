import { Control, FormState, get } from "react-hook-form";
import { ChildStrategyType } from "components/Forms/FormChildren";
import { ComponentType } from "react";
import { TextField } from "../../../TextField";

export const TextFieldStrategy: ChildStrategyType = (
  child: JSX.Element,
  control: Control,
  formState: FormState<ComponentType>,
) => (
  <TextField
    {...child.props}
    inputProps={control.register(child.props.name)}
    error={get(formState.errors, child.props.name)?.message}
  />
);
