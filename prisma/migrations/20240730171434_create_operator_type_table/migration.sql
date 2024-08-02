-- CreateTable
CREATE TABLE "OperatorTypes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperatorTypes_pkey" PRIMARY KEY ("id")
);
