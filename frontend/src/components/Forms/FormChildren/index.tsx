import { Children, PropsWithChildren, cloneElement } from "react";
import { Control, FormState, useFormContext } from "react-hook-form";
import { TextFieldStrategy } from "../Strategies/TextField";
import { TextField } from "../../../components/TextField";

export type ComponentType = {
  [strategyComponent: string]: JSX.Element;
};

export type ChildStrategyType = (
  child: JSX.Element,
  control: Control,
  formState: FormState<ComponentType>,
) => JSX.Element;

const strategyMap: Map<unknown, ChildStrategyType> = new Map();
strategyMap.set(TextField, TextFieldStrategy);

export function FormChildren({ children }: PropsWithChildren) {
  const { control, formState } = useFormContext();
  return Children.map(children as JSX.Element[], child => {
    let props = { ...child?.props };
    if (!props.name && !props.children) {
      return child;
    }

    const strategy = strategyMap.get(child?.type);

    if (strategy) {
      return strategy(child, control, formState);
    }

    if (props.children) {
      props = {
        ...props,
        children: <FormChildren>{props.children}</FormChildren>,
      };
    }
    return cloneElement(child, props);
  });
}
