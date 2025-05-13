-- CreateTable
CREATE TABLE "UserTest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "LessonTestID" INTEGER NOT NULL,

    CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "QuestionsID" INTEGER NOT NULL,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_LessonTestID_fkey" FOREIGN KEY ("LessonTestID") REFERENCES "LessonTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_QuestionsID_fkey" FOREIGN KEY ("QuestionsID") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
