/*
  Warnings:

  - Added the required column `AnswerId` to the `UserAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserTestID` to the `UserAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswers" ADD COLUMN     "AnswerId" INTEGER NOT NULL,
ADD COLUMN     "UserTestID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_AnswerId_fkey" FOREIGN KEY ("AnswerId") REFERENCES "Answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_UserTestID_fkey" FOREIGN KEY ("UserTestID") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
