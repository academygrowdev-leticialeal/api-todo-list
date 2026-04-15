-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "field_string" TEXT NOT NULL,
    "field_number" INTEGER NOT NULL,
    "field_boolean" BOOLEAN NOT NULL,
    "field_date" TIMESTAMP(3) NOT NULL,
    "field_array" TEXT[],
    "field_object" JSONB NOT NULL,
    "field_optional" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);
