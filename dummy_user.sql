-- Dummy User Data for Advisr.ai
-- This creates a test user with ID 1 for development

USE vthacks_2025;

-- Insert dummy user
INSERT INTO user (user_id, first, last, school, grad_year, major, instate, state, country, created_at, updated_at) VALUES
(1, 'John', 'Doe', 'Virginia Tech', 2025, 'Computer Science', TRUE, 'Virginia', 'USA', NOW(), NOW())
ON DUPLICATE KEY UPDATE
first = VALUES(first),
last = VALUES(last),
school = VALUES(school),
grad_year = VALUES(grad_year),
major = VALUES(major),
instate = VALUES(instate),
state = VALUES(state),
country = VALUES(country),
updated_at = NOW();

-- Insert dummy financial data
INSERT INTO financial (user_id, salary, credit_score, savings, created_at, updated_at) VALUES
(1, 75000.00, 720, 15000.00, NOW(), NOW())
ON DUPLICATE KEY UPDATE
salary = VALUES(salary),
credit_score = VALUES(credit_score),
savings = VALUES(savings),
updated_at = NOW();

-- Insert dummy tuition data
INSERT INTO tuition (user_id, tuition_full, scholarship, created_at, updated_at) VALUES
(1, 15000.00, 5000.00, NOW(), NOW())
ON DUPLICATE KEY UPDATE
tuition_full = VALUES(tuition_full),
scholarship = VALUES(scholarship),
updated_at = NOW();

-- Insert dummy loan data
INSERT INTO loan (user_id, principal, interest_rate, fixed, loan_term, created_at, updated_at) VALUES
(1, 25000.00, 0.0450, TRUE, 120, NOW(), NOW())
ON DUPLICATE KEY UPDATE
principal = VALUES(principal),
interest_rate = VALUES(interest_rate),
fixed = VALUES(fixed),
loan_term = VALUES(loan_term),
updated_at = NOW();

-- Insert some sample chat reports
INSERT INTO chat (user_id, summary, content, created_at, updated_at) VALUES
(1, 'Financial Aid Discussion', '# Financial Aid Discussion\n\n## Summary\nWe discussed various financial aid options available for Virginia Tech students.\n\n## Key Points\n- **Federal Aid**: FAFSA application deadline is March 1st\n- **State Aid**: Virginia residents eligible for VGAP grants\n- **Scholarships**: Merit-based scholarships available for high GPA students\n- **Work-Study**: On-campus employment opportunities\n\n## Action Items\n- [ ] Complete FAFSA application by February 15th\n- [ ] Research department-specific scholarships\n- [ ] Apply for work-study positions\n\n## Next Steps\n- Follow up on scholarship applications\n- Schedule meeting with financial aid office', NOW(), NOW()),

(1, 'Loan Options Analysis', '# Loan Options Analysis\n\n## Overview\nAnalyzed different loan options for covering remaining tuition costs.\n\n## Federal Loans\n- **Direct Subsidized**: $5,500 per year, no interest while in school\n- **Direct Unsubsidized**: $7,000 per year, interest accrues immediately\n- **PLUS Loans**: For parents, higher interest rate\n\n## Private Loans\n- **Bank of America**: 4.5% APR, requires co-signer\n- **Sallie Mae**: 4.2% APR, good for students with good credit\n\n## Recommendations\n1. Maximize federal loans first (lower rates)\n2. Consider private loans only if needed\n3. Apply with co-signer for better rates\n\n## Timeline\n- Apply for federal loans: March 1st\n- Private loan applications: April 1st', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),

(1, 'Budget Planning Session', '# Budget Planning Session\n\n## Monthly Income\n- **Part-time job**: $800/month\n- **Parental support**: $500/month\n- **Total**: $1,300/month\n\n## Monthly Expenses\n- **Rent**: $600/month\n- **Food**: $300/month\n- **Transportation**: $100/month\n- **Books/Supplies**: $150/month\n- **Miscellaneous**: $100/month\n- **Total**: $1,250/month\n\n## Savings\n- **Monthly surplus**: $50\n- **Emergency fund goal**: $2,000\n- **Current emergency fund**: $1,200\n\n## Recommendations\n- Consider increasing work hours\n- Look for higher-paying part-time jobs\n- Apply for additional scholarships', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),

(1, 'Scholarship Opportunities', "# Scholarship Opportunities\n\n## Available Scholarships\n\n### Academic Excellence\n- **Presidential Scholarship**: $5,000/year, 3.8+ GPA required\n- **Dean\'s List Scholarship**: $2,000/year, 3.5+ GPA required\n\n### Department Specific\n- **Computer Science Excellence**: $3,000/year, CS major only\n- **Engineering Innovation**: $4,000/year, Engineering major\n\n### Need-Based\n- **First Generation Student**: $2,500/year\n- **Rural Student Support**: $1,500/year\n\n## Application Deadlines\n- **Fall Semester**: March 15th\n- **Spring Semester**: October 15th\n\n## Action Items\n- [ ] Update resume with recent achievements\n- [ ] Write personal statement\n- [ ] Request recommendation letters\n- [ ] Submit applications by March 1st", NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- Verify the data was inserted
SELECT 'Dummy user created successfully!' as status;
SELECT * FROM user WHERE user_id = 1;
SELECT * FROM financial WHERE user_id = 1;
SELECT * FROM tuition WHERE user_id = 1;
SELECT * FROM loan WHERE user_id = 1;
SELECT COUNT(*) as chat_count FROM chat WHERE user_id = 1;
