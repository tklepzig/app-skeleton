import { PropsWithChildren } from "react";
import { cls } from "../../cls";
import css from "./Headline.module.css";

export const Headline = ({ children }: PropsWithChildren) => (
  <h1 className={cls(css.anyClass1, css.anyClass2)}>{children}</h1>
);
