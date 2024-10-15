import React, { ReactNode, Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

interface ButtonProps extends BaseProps {
  active: boolean;
  reversed: boolean;
  children?: ReactNode;
}

export const Button = React.forwardRef<HTMLSpanElement, ButtonProps>(
  ({ className, active, reversed, children, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className as string, // Now className is correctly typed
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    >
      {children}
    </span>
  )
);

interface EditorValueProps extends BaseProps {
  value: { document: { nodes: { text: string }[] } }; // Specify the structure of the value object
}

Button.displayName = "Button";

export const EditorValue = React.forwardRef<HTMLDivElement, EditorValueProps>(
  ({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
      .map((node: any) => node.text) // Assuming the node has a 'text' property
      .join("\n");

    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className as string,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: red;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slates value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    );
  }
);

EditorValue.displayName = "EditorValue";

export const Icon = React.forwardRef<
  HTMLSpanElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      "material-icons",
      className as string, // Now className is correctly typed
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));

Icon.displayName = "Icon";

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
);

Instruction.displayName = "Instruction";

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

Menu.displayName = "Menu";

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
);

Toolbar.displayName = "Toolbar";
