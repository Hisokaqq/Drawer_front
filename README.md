# Real-Time Collaborative Drawer

## Overview

Welcome to the Real-Time Collaborative Drawer, a Next.js project integrated with Node.js. This application allows users to share a single canvas where they can draw, express, and witness art being created by others in real-time across the globe. It's an experiment in collaborative creativity and instant sharing.

Experience the application live: [Link](https://drawer-front.vercel.app/)

Backend(websockets): [Link](https://github.com/Hisokaqq/drawer)

## Features

- **Shared Canvas:** A single drawing plane shared among all users.
- **Real-Time Updates:** See what others are drawing in real-time. Changes on the canvas are instantly visible to all participants.
- **Intuitive Drawing Tools:** Offers basic drawing tools such as brush size, color picker, and eraser for a seamless drawing experience.

## Technology Stack

This project is built using the following technologies:

- **Frontend:** Next.js for the React framework providing server-side rendering and generating static websites.
- **Backend:** Node.js for handling real-time web socket connections, ensuring seamless communication between the client and server.
- **Deployment:** Deployed on Vercel for frontend hosting, providing fast loading times and automatic scaling.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  git clone https://github.com/Hisokaqq/drawer.git
  npm install
  npm run dev
