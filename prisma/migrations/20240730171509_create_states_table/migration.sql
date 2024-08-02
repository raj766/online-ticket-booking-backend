-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "label_title" VARCHAR(255) NOT NULL,
    "state_code" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);
