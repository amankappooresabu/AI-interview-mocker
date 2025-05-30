import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview= pgTable('mock_interview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    JobPos: varchar('JobPos').notNull(),
    JobDesc: varchar('JobDesc').notNull(),
    JobExp: varchar('JobExp').notNull(),
    createdAt: varchar('createdAt').notNull(),
    createdBy: varchar('createdBy').notNull(),
    mockId: varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns').notNull(),
    userAns: text('userAns'),
    feedback: varchar('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail').notNull(),
    createdAt: varchar('createdAt').notNull(),
})