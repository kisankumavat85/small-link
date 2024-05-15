-- CreateIndex
CREATE INDEX "Click_shortUrlId_idx" ON "Click"("shortUrlId");

-- CreateIndex
CREATE INDEX "Click_createdAt_idx" ON "Click"("createdAt");

-- CreateIndex
CREATE INDEX "Click_shortUrlId_createdAt_idx" ON "Click"("shortUrlId", "createdAt");

-- CreateIndex
CREATE INDEX "Click_shortUrlId_country_idx" ON "Click"("shortUrlId", "country");

-- CreateIndex
CREATE INDEX "Click_shortUrlId_browser_idx" ON "Click"("shortUrlId", "browser");

-- CreateIndex
CREATE INDEX "Click_shortUrlId_os_idx" ON "Click"("shortUrlId", "os");

-- CreateIndex
CREATE INDEX "ShortURL_userId_idx" ON "ShortURL"("userId");

-- CreateIndex
CREATE INDEX "ShortURL_userId_createdAt_idx" ON "ShortURL"("userId", "createdAt");
