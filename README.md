# Project Summary and Setup Instructions 

## Project Name: Chats-PDF
This project is a web-based application leveraging a range of technologies, tools, and frameworks. 

## Technology and Tools 
- **Next.js**: A React framework for production which adds features such as static exporting and server-side rendering to your React applications. 
- **TypeScript**: An open-source language built on JavaScript by adding static type definitions. 
- **Eslint**: A tool for identifying and reporting on patterns in JavaScript. 
- **Tailwind CSS**: A highly customizable, low-level CSS framework. 
- **Node Package Manager (NPM)**: The package manager for Node.JS to install necessary packages. 
- **VS code**: A code editor for building and debugging web and cloud applications. 
- **Shadcn-ui**: A popular tailwindcss framework to design amazing UI.
- **Drizzle ORM**: A popular typescript based postgresql ORM which works with edge runtime. 
- **Pinecone**: A popular cloud based fast vector database storage provider. 

## Project Setup 
1. **Initialize the project**: Initialize a new Next.js project using the following command on the terminal. 
    `npx create-next-app@latest --typescript` 
    When prompted, name the project "Chats-PDF.-youtube". Be sure to use the TypeScript flag. 

2. **Open the project**: Change the directory to the project root folder "chat-pdf-youtube" using the following command. `cd genieai` Open the project in the vscode using the following command. 
    `code .` 

3. **Add the Environmental Variables to .env file**: Get the environment variables from the given database URL and add those to your .env file in the form of key-value pairs. The file should look like this:

    `DATABASE_URL = {Your Database URL here} NEXT_BASE_URL = {Your Next base URL here}` 

    Be sure that there are no white spaces or lines. 

4. **Setup Next Base URL (Optional)**: List down the next base URL in the environmental variables section of your project. This URL might need to be updated later with the one provided by the platform you choose to deploy your project. 

5. **Run the project**: To make sure that the project is set up correctly, run the following command. `npm run dev` That's all! We have set up our 'Chats-PDF.-youtube' project successfully. Just visit your localhost to check whether everything is working fine or not. ## Deployment When you are ready to deploy, update the `NEXT_BASE_URL` variable in your .env file with the Versel URL or URL that your specific platform provides. Please note, this is a generalized setup, more specific changes might be required according to the need of your project.

## Dependecies Issue

Peer dependency for react with clerk and drizzle-orm cause problems so use peer dependecy flags

## Tools and Technologies used in this project

- Nextjs (Typescript)
- Dribble ORM
- ShadCN
- TailwindCSS
- NeonDB/Serverless
- Stripe
- Firebase Storage Bucket (Firebase rules are allowed for all users)
- Edge Tools (Runtime)
- AI/react modules
