import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const routesPath = path.resolve(__dirname, "routes");
const routesFolder = fs.readdirSync(routesPath);

(async () => {
  for (const folder of routesFolder) {
    const routeFiles = fs.readdirSync(path.join(routesPath, folder)).filter(file => file.endsWith('.js'));
    for (const file of routeFiles) {
      const route = await import(path.join(routesPath, folder, file));
      app.use('/', route.default);
    } 
  }
})();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
