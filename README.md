### No-code Website Builder
## Start building websites without writing a single line of code! 

## Official Website Link:
https://sandra.cinatrin.pro

---
# Run the project

1. Install dependencies
   ```bash
   yarn
   ```
   
2. Create `.env.local` file in the project root and add the following content:

   ```text
   POSTGRES_URL="postgresql://Carisa-Li:5agMrdhkxjY9@ep-sparkling-shape-a1id1drd.ap-southeast-1.aws.neon.tech/website?sslmode=require"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   JWT_KEY="harrypotter"
   ```

3. Start the database
   ```bash
   docker compose up -d
   ```

4. Start the development server
   ```bash
   yarn dev
   ```
5. Open http://localhost:3000 in your browser


---
