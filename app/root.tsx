import { json, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData
} from "@remix-run/react";
import styles from "~/styles/app.css";
import { prisma } from "~/utils/db.server";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});

export const loader = async () => {
  return json(await prisma.post.findMany());
};

export default function App() {
  const posts = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className='text-red-500'>Hi there</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              {post.title} - {new Date(post.createdAt).toLocaleDateString()} -{" "}
              {post.authorId}
            </li>
          ))}
        </ul>
        <button
          className='disabled:bg-gray-900 disabled:opacity-80'
          disabled={fetcher.state === "submitting"}
          onClick={() =>
            fetcher.submit(
              { title: "Fifth Day", authorId: "cl966a2ot0004o40ttyuvyl1t" },
              { action: "/example", method: "post" }
            )
          }
        >
          Create post
        </button>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
