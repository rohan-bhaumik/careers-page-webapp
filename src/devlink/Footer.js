"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

export function Footer({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer", "is-inverse")}
      tag="footer"
    >
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.Grid
          className={_utils.cx(_styles, "grid_4-col", "gap-medium")}
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "w-node-_60f5fdb0-a0e1-be3e-4300-e75b6415f493-6415f490"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_25727a3d-379c-5c57-7915-14cd562c0b4d-9351d813"
            )}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "footer_link", "on-inverse")}
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "w-node-_60f5fdb0-a0e1-be3e-4300-e75b6415f49a-6415f490"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_686aafad-4ad6-d604-e192-54da9351d81c-9351d813"
            )}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "footer_link", "on-inverse")}
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block tag="div">
                {"rohan.bhaumik@gmail.com"}
              </_Builtin.Block>
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Grid
            className={_utils.cx(
              _styles,
              "grid_2-col",
              "gap-small",
              "w-node-_60f5fdb0-a0e1-be3e-4300-e75b6415f4c2-6415f490"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_4b35a35a-6825-701b-7465-a7558e90304e-9351d813"
            )}
          >
            <_Builtin.List
              className={_utils.cx(_styles, "footer_icon-group")}
              id={_utils.cx(
                _styles,
                "w-node-_60f5fdb0-a0e1-be3e-4300-e75b6415f4c3-6415f490"
              )}
              tag="ul"
              aria-label="Social media links"
              role="list"
              unstyled={true}
            >
              <_Builtin.ListItem
                className={_utils.cx(_styles, "margin-bottom_none")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_icon-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "icon_small-1x1",
                      "text-color_inherit"
                    )}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "screen-reader")}
                    tag="div"
                  >
                    {"Facebook"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "margin-bottom_none")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_icon-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                    target: "_blank",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "icon_small-1x1",
                      "text-color_inherit"
                    )}
                    tag="div"
                  >
                    <_Builtin.DOM
                      tag="svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 16 16"
                    >
                      <_Builtin.DOM
                        tag="path"
                        d="M12.3723 1.16992H14.6895L9.6272 6.95576L15.5825 14.829H10.9196L7.26734 10.0539L3.08837 14.829H0.769833L6.18442 8.64037L0.471436 1.16992H5.2528L8.55409 5.53451L12.3723 1.16992ZM11.5591 13.4421H12.843L4.55514 2.48399H3.17733L11.5591 13.4421Z"
                        fill="currentColor"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "screen-reader")}
                    tag="div"
                  >
                    {"X"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "margin-bottom_none")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_icon-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                    target: "_blank",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "icon_small-1x1",
                      "text-color_inherit"
                    )}
                    tag="div"
                  >
                    <_Builtin.DOM
                      tag="svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 16 16"
                    >
                      <_Builtin.DOM
                        tag="path"
                        d="M15.3,0H0.7C0.3,0,0,0.3,0,0.7v14.7C0,15.7,0.3,16,0.7,16h14.7c0.4,0,0.7-0.3,0.7-0.7V0.7 C16,0.3,15.7,0,15.3,0z M4.7,13.6H2.4V6h2.4V13.6z M3.6,5C2.8,5,2.2,4.3,2.2,3.6c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4 C4.9,4.3,4.3,5,3.6,5z M13.6,13.6h-2.4V9.9c0-0.9,0-2-1.2-2c-1.2,0-1.4,1-1.4,2v3.8H6.2V6h2.3v1h0c0.3-0.6,1.1-1.2,2.2-1.2 c2.4,0,2.8,1.6,2.8,3.6V13.6z"
                        fill="currentColor"
                      />
                    </_Builtin.DOM>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "screen-reader")}
                    tag="div"
                  >
                    {"LinkedIn"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "margin-bottom_none")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "footer_icon-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "icon_small-1x1",
                      "text-color_inherit"
                    )}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "screen-reader")}
                    tag="div"
                  >
                    {"YouTube"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.ListItem>
            </_Builtin.List>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-color_secondary",
                "w-node-_60f5fdb0-a0e1-be3e-4300-e75b6415f4ea-6415f490"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_686aafad-4ad6-d604-e192-54da9351d859-9351d813"
              )}
              tag="div"
            >
              {"Made by Rohan"}
              {"'"}
              {"s Demo Site"}
            </_Builtin.Block>
          </_Builtin.Grid>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
