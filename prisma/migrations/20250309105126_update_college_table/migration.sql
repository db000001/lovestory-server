/*
  Warnings:

  - A unique constraint covering the columns `[email_domain]` on the table `college_tbl` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[college]` on the table `college_tbl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `college_tbl_email_domain_key` ON `college_tbl`(`email_domain`);

-- CreateIndex
CREATE UNIQUE INDEX `college_tbl_college_key` ON `college_tbl`(`college`);
