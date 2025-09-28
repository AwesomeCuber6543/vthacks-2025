-- Create database (uncomment if needed)
CREATE DATABASE vthacks_2025;
USE vthacks_2025;

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS tuition;
DROP TABLE IF EXISTS loan;
DROP TABLE IF EXISTS financial;
DROP TABLE IF EXISTS school;
DROP TABLE IF EXISTS user;

-- Create user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    school VARCHAR(100),
    grad_year INT,
    major VARCHAR(100),
    instate BOOLEAN DEFAULT FALSE,
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'USA',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create school table
CREATE TABLE school (
    school_name VARCHAR(100) PRIMARY KEY,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create financial table
CREATE TABLE financial (
    user_id INT PRIMARY KEY,
    salary DECIMAL(10,2),
    credit_score INT CHECK (credit_score >= 300 AND credit_score <= 850),
    savings DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Create loan table
CREATE TABLE loan (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    principal DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,4) NOT NULL,
    fixed BOOLEAN DEFAULT TRUE,
    loan_term INT NOT NULL COMMENT 'Loan term in months',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Create tuition table
CREATE TABLE tuition (
    t_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tuition_full DECIMAL(10,2) NOT NULL,
    scholarship DECIMAL(10,2) DEFAULT 0,
    net_tuition DECIMAL(10,2) GENERATED ALWAYS AS (tuition_full - scholarship) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Create chat table
CREATE TABLE chat (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    summary TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX idx_user_school ON user(school);
CREATE INDEX idx_user_grad_year ON user(grad_year);
CREATE INDEX idx_loan_user_id ON loan(user_id);
CREATE INDEX idx_tuition_user_id ON tuition(user_id);
CREATE INDEX idx_chat_user_id ON chat(user_id);
CREATE INDEX idx_chat_created_at ON chat(created_at);

-- Insert some sample data (optional)
INSERT INTO school (school_name, state) VALUES
('Virginia Tech', 'Virginia'),
('University of Virginia', 'Virginia'),
('Virginia Commonwealth University', 'Virginia'),
('George Mason University', 'Virginia'),
('Old Dominion University', 'Virginia');

-- Sample user data
INSERT INTO user (first, last, school, grad_year, major, instate, state, country) VALUES
('John', 'Doe', 'Virginia Tech', 2025, 'Computer Science', TRUE, 'Virginia', 'USA'),
('Jane', 'Smith', 'University of Virginia', 2024, 'Business', TRUE, 'Virginia', 'USA'),
('Mike', 'Johnson', 'Virginia Tech', 2026, 'Engineering', FALSE, 'California', 'USA');

-- Sample financial data
INSERT INTO financial (user_id, salary, credit_score, savings) VALUES
(1, 75000.00, 720, 15000.00),
(2, 65000.00, 680, 12000.00),
(3, 0.00, 650, 5000.00);

-- Sample loan data
INSERT INTO loan (user_id, principal, interest_rate, fixed, loan_term) VALUES
(1, 25000.00, 0.0450, TRUE, 120),
(2, 30000.00, 0.0525, TRUE, 180),
(3, 20000.00, 0.0600, FALSE, 240);

-- Sample tuition data
INSERT INTO tuition (user_id, tuition_full, scholarship) VALUES
(1, 15000.00, 5000.00),
(2, 18000.00, 3000.00),
(3, 20000.00, 2000.00);

-- Sample chat data
INSERT INTO chat (user_id, summary, content) VALUES
(1, 'Discussion about loan options', '# Loan Discussion\n\nWe discussed various loan options for financing education...'),
(2, 'Financial planning session', '# Financial Planning\n\nReviewed budget and savings goals...'),
(3, 'Scholarship opportunities', '# Scholarship Search\n\nFound several scholarship opportunities...');

-- Show table creation confirmation
SELECT 'Database schema created successfully!' as status;
