# FB貼文內容
[112-1] Web Programming Final
(Group 22) No-code Website Builder
組員：
B09902115 林方綺
B09504007 張宗旻
B09902022 李欣怡

Demo 影片連結
https://www.youtube.com/watch?v=LdIAVNlBROM

服務描述
我們的平台提供了各種預設模板，讓使用者可以根據自己的需求進行定制。只需透過直觀的介面，即可將元件、模塊添加到網站上，從而節省了大量的時間和精力。讓使用者即使不會網路服務程式設計，也能輕易、快速地進行網站製作。
Deployed 連結
https://sandra.cinatrin.pro/
操作方式
註冊登入。
點擊「Create New Project」創建新頁面，或點擊已創建的頁面繼續編輯。
若需創建新頁面，請先填入名稱描述並選擇背景（選擇喜愛的背景圖片，或使用customize your own background自創漸層色背景），而後按「Submit」以進入編輯頁面。
點擊左上方的edit可以進入編輯模式，於編輯模式下可以透過點擊「Display」回到預覽模式。
編輯模式：
點擊任意「+Component」，然後從左側選單選擇想插入的內容類型，並於彈出頁面填寫相應欄位，最後按下「Submit」，便會在所選的「+Component」處插入內容。
點擊內容右上的紅叉即可刪除。
預覽模式：
點擊左下的「Download」可以下載製作好的網頁。
此外也可以隨時點擊左下角的「Change Info」修改頁面標題、描述、背景等。
其他說明
無
使用與參考之框架/模組/原始碼
無
使用之第三方套件、框架、程式碼
前端：Next.js/tailwind/material UI/bootstrap
後端：Next.js/jsonwebtoken/PostgreSQL/Swagger

專題製作心得
一開始我們採用vite+express作為網站框架，然而在deploy的階段遭遇到各種問題，最終不得不面臨deploy失敗的窘境。在最後三天匆忙地轉向了next.js框架。儘管在這過程中有些原先計畫中想實現的小功能被迫放棄，但幸好我們最終成功deploy了網站。這個過程中，我們不僅擴展了對網站構建, 爬蟲技術的理解，也更深刻地體會到前後端的良好溝通對於project成功的至關重要性。這段經歷雖然充滿了挑戰，但同時也成為我們成長和提升技能的寶貴機會。

---
# Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Create `.env.local` file in the project root and add the following content:

   ```text
   POSTGRES_URL="postgres://postgres:postgres@localhost:5432/website"

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   JWT_KEY= # random string
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
# 負責項目
林方綺：前端(登入/gallery)
張宗旻：前端(working page)
李欣怡：後端