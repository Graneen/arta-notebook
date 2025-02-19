ALTER TABLE "Posts" ADD COLUMN "userId" INTEGER;

INSERT INTO "User" (email, password, name) 
VALUES ('test@test.com', '$2a$10$xxxxxxxxxxx', 'Test User');


UPDATE "Posts" SET "userId" = (SELECT id FROM "User" LIMIT 1);


ALTER TABLE "Posts" ALTER COLUMN "userId" SET NOT NULL;


ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE; 