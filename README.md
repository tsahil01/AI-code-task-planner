# AI-code-task-planner

- This is a AI code task planner for your codebase.
- It will help you to plan your code tasks and will help you to manage your codebase.

![ss](https://github.com/user-attachments/assets/e406dd76-7bd5-4a30-921a-a005bbfea5d1)

# How to use

## A. Using Clone:

0. Install typescript and ts-node.

```bash
npm install -g typescript ts-node
```

1. Using Cloning the repository.

```bash
git clone https://github.com/tsahil01/AI-code-task-planner
```

2. Install the required packages.

```bash
npm install
```

3. Create a .env file and add the following variables.

```bash
OPEN_ROUTE_API_KEY=<Your API Key>
```

- You can get free API key from https://openrouter.ai/
- To change LLama model, go to `src/main/llama.js` and change the model name.

```ts
model: <Your Model Name>
```

4. Run the code.

```bash
npm run start
```

## B. Using NPM:

1. Navigate to the folder where your codebase is located (package.json should be present).

```bash
$ cd <Your Codebase>
```

2. Install the package.

```bash
$ npm install codetask
```
3. Create a .env file in project directory and add the following variables.

```bash
OPEN_ROUTE_API_KEY=<Your API Key>
```

4. Open the terminal and run the following command.

```bash
$ npx codetask
```
