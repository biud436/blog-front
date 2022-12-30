# Introduction

This project is the blog that is made with the javascript framework named Next.js. it is compatibled with the [blog-api-server](https://github.com/biud436/blog-api-server)

[한국어(Korean) 문서](https://github.com/biud436/blog-front/blob/main/README.ko.md)

# Features

## Category Editor

The category editor allows you to create a category with a hierarchical structure. You can create a category with a parent-child relationship. You can also change the order of the category by dragging and dropping using `react-dnd`

![code-13](https://user-images.githubusercontent.com/13586185/205221912-1b0640ae-96c9-4367-8e2e-85c742a07e8a.gif)

## Blog Post Editor

You would be able to write the a new post using [TUI-Editor](https://ui.toast.com/tui-editor), it is able to select the category after clicking the category select box. You can also upload the image to the AWS S3 bucket. and it supports the code highlight feature that used a dark theme.

## 🛠️ Tech Stack

-   Typescript
-   Next.js
-   Material-UI
-   Mobx
-   SWR

## Period of Development

2022.10.10 ~ 2022.11.15 (about a month)

## Todo List

-   [x] Creating layouts
-   [x] Apply State Management Library (Mobx)
-   [x] Administrator Tool
-   [x] Creating a Hierarchical Categories using Nested Model
-   [x] Post (Pagination, Search, Write, Read, Delete)
-   [x] Image Upload Using AWS S3
-   [x] Copy Post Link
-   [x] Integrate with External Comment Plugin
-   [x] Code Highlighting
-   [x] Apply SWR to certain pages such as a page named `posts/[id].tsx`
-   [x] Apply Open Graph
-   [x] Porting with Next.js

## Installation

To start this project, you must have `Visual Studio Code` and `Node.js LTS v16` or higher installed. The node package manager uses `yarn`. `yarn berry` is faster, but `pure yarn` is used. Before starting this project, you must download the dependency node packages.

Open the integrated terminal or text editor (VS Code) and press Ctrl + ` or use the integrated terminal open feature to open the terminal at the bottom.

You can install all project dependency packages with the following command.

```bash
yarn install
```

When the above command is executed, the dependency packages will start to download. It may take several seconds or a minute or more, so please wait a moment. When the package download is complete, enter `yarn next:dev` in the terminal to start the development server.

```bash
yarn next:dev
```

This development server supports HMR (Hot Module Reload) via Webpack, so when you save the project, the browser will apply the CSS or tag (V-DOM) changes immediately.

Please open the `http://localhost:8080` in the browser to see the result.

## Deployment

This project is deployed a docker image using the GitHub Action and Github Package. The server automatically restarts using AWS CodeDeploy.

---
