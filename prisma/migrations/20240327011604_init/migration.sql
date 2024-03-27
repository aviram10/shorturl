-- CreateTable
CREATE TABLE "urls" (
    "orginalUrl" VARCHAR(255) NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "counter" INTEGER DEFAULT 0,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("shortUrl")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_orginalUrl_key" ON "urls"("orginalUrl");
