-- CreateTable
CREATE TABLE "urls" (
    "orginalUrl" VARCHAR(255) NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "counter" INTEGER DEFAULT 0,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("shortUrl")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_orginalUrl_key" ON "urls"("orginalUrl");
