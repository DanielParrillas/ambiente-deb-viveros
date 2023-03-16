import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
        <title>Viveros</title>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
