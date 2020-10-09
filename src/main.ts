import * as React from "react";
import { render } from "react-dom";

import NoteProvider from "./context/noteProvider";

export enum ENDPOINT {
  LIST = "https://us-central1-nabildroid-development.cloudfunctions.net/note/list",
  UPDATE = "https://us-central1-nabildroid-development.cloudfunctions.net/note/update",
  ADD = "https://us-central1-nabildroid-development.cloudfunctions.net/note/add",
}

export type EndpointAdd = {
  title: string;
  content: string;
};
export type EndpointUpdate = {
  created: number;
  done: boolean;
};
export type EndpointList = Item[];

export type History = {
  type: "created" | "done" | "undone";
  time: number;
};
export type Item = {
  title: string;
  content: string;
  done: boolean;
  history: History[];
  fetched?: boolean;
};

import App from "./app";

import "./style/main.less";
const root = document.querySelector(".root");

render(
  React.createElement(NoteProvider, {
    children: React.createElement(App),
  }),
  root
);
