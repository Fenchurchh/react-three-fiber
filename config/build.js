import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ['./src/app.js'],
    bundle: true,
    publicPath:"/",
    loader: {
      ".png":"file"
    },
    sourcemap: true,
    outfile: 'dist/bundle.js',
  })
  .catch(() => process.exit(1))