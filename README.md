This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone file _.env.example_ to _.env.local_ and change values, example:

```
  NEXT_PUBLIC_BASE_URL=https://staging-web.gamifyclub.com
  NEXT_PUBLIC_API_URL_BACKEND=https://api-gaming.dev.gamifyclub.com
  NEXT_PUBLIC_API_URL_SMART_CONTRACT=https://api.devnet.solana.com
  NEXT_PUBLIC_SOLLET_ENV=devnet
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy

- Clone this repository to your server
- clone file _.env.example_ to _.env.local_ and change values, example:

  ```
  NEXT_PUBLIC_BASE_URL=https://staging-web.gamifyclub.com
  NEXT_PUBLIC_API_URL_BACKEND=https://api-gaming.dev.gamifyclub.com
  NEXT_PUBLIC_API_URL_SMART_CONTRACT=https://api.devnet.solana.com
  NEXT_PUBLIC_SOLLET_ENV=devnet
  ```

### Deploy with pm2

- Ensure pm2 has installed on your server
- Add script to run your specific port to `package.json`. Below, I added script `"start-staging-4012": "next start -p 4012"` to run code on port **4012**

  ```
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "start-4012": "next start -p 4012",
  "lint": "next lint"
  ```

- Next, open file app.json to update `args` param become the script added to `package.json`. Example:

```
  "args": "run start-4012"
```

- The final step, run command to deploy:

```
  "args": "npm i && npm run build && pm2 restart app.json"
```

### Deploy with docker

- Ensure docker has installed on your server
- Update files **Dockerfile** and **docker-compose.yml** to use your desired port
- Run command:

```
   docker-compose up --build -d
```
