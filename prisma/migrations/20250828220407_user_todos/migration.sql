-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
