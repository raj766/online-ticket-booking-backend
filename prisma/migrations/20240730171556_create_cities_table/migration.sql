-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "state_id" VARCHAR(255) NOT NULL,
    "popular_city" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL,
    "label_title" VARCHAR(255) NOT NULL,
    "city_code" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "image" VARCHAR(255),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);
