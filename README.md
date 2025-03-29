# SwitchCraft: Customize Your Switchboards with Ease

**SwitchCraft** is a web-based tool that empowers you to create and customize switchboard layouts for homes and offices. Whether you're designing a new layout or updating an existing one, SwitchCraft provides a user-friendly interface to select, arrange, and configure switches to fit your space and preferences.

## Key Features:
- **Drag-and-drop interface** for easy customization
- Multiple switch designs and configurations
- Real-time previews of your switchboard
- Save and share your designs with others
- Compatible with both home and office switchboard systems

SwitchCraft makes it simple for professionals and homeowners to craft the perfect switchboard setup without hassle.

## Folder Structure (App)
```
.
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ src
│  ├─ app
│  │  ├─ _components
│  │  │  └─ post.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth]
│  │  │  │     └─ route.ts
│  │  │  └─ trpc
│  │  │     └─ [trpc]
│  │  │        └─ route.ts
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ server
│  │  ├─ auth.ts
│  │  ├─ db.ts
│  │  └─ api
│  │     ├─ routers
│  │     │  └─ example.ts
│  │     ├─ trpc.ts
│  │     └─ root.ts
│  ├─ styles
│  │  └─ globals.css
│  ├─ env.js
│  └─ trpc
│     ├─ query-client.ts
│     ├─ react.tsx
│     └─ server.ts
├─ .env
├─ .env.example
├─ .eslintrc.cjs
├─ .gitignore
├─ next-env.d.ts
├─ next.config.js
├─ package.json
├─ postcss.config.cjs
├─ prettier.config.js
├─ README.md
├─ T3README.md
├─ tailwind.config.ts
└─ tsconfig.json
```

## TODO:
- [x] Setup Dev Database (docker/mysql).
- [x] Setup Dev NextAuth (secret/discord).
- [x] Setup Dev Environment.
- [ ] Make it Deploy (vercel).
- [x] Create the first page.


## Docker

Run to build the image:
```sh
docker build -t cswitch .
```

Run the Docker Container:
```sh
docker run -p 3000:3000 cswitch
```
