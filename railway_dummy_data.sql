-- Railway MySQL Dummy Data
INSERT INTO user (user_id, first, last, school, grad_year, major, instate, state, country) 
VALUES (1, 'John', 'Doe', 'Virginia Tech', 2025, 'Computer Science', 1, 'Virginia', 'USA');

INSERT INTO financial (user_id, salary, credit_score, savings) 
VALUES (1, 75000.00, 720, 15000.00);

INSERT INTO tuition (user_id, tuition_full, scholarship, net_tuition) 
VALUES (1, 15000.00, 5000.00, 10000.00);

INSERT INTO school (school_name, state) 
VALUES ('Virginia Tech', 'Virginia');

INSERT INTO chat (user_id, summary, content) VALUES
(1, 'Discussion about loan options', '# Loan Discussion\n\nWe discussed various loan options for financing education...'),
(1, 'Budget Planning Session', '# Budget Planning Session\n\n## Monthly Income\n- **Part-time job**: $800/month\n- **Parental support**: $500/month\n- **Total**: $1,300/month'),
(1, 'Scholarship Opportunities', '# Scholarship Opportunities\n\n## Available Scholarships\n\n### Academic Excellence\n- **Presidential Scholarship**: $5,000/year, 3.8+ GPA required'),
(1, 'Financial Aid Discussion', '# Financial Aid Discussion\n\n## Summary\nWe discussed various financial aid options available for Virginia Tech students.'),
(1, 'Loan Options Analysis', '# Loan Options Analysis\n\n## Overview\nAnalyzed different loan options for covering remaining tuition costs.');
