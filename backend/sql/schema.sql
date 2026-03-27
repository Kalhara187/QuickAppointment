CREATE DATABASE IF NOT EXISTS quickappointment;
USE quickappointment;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contacts_email (email),
  INDEX idx_contacts_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NULL,
  image_url VARCHAR(255) NULL,
  icon VARCHAR(50) NULL,
  category VARCHAR(80) NULL,
  availability_status TINYINT(1) NOT NULL DEFAULT 1,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  featured_rank INT UNSIGNED NOT NULL DEFAULT 999,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_available_featured (availability_status, is_featured),
  INDEX idx_services_featured_rank (featured_rank),
  INDEX idx_services_category (category)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(120) NOT NULL,
  comment TEXT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  featured_rank INT UNSIGNED NOT NULL DEFAULT 999,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_testimonials_published_rank (is_published, featured_rank),
  CONSTRAINT chk_testimonials_rating CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  service_id INT UNSIGNED NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  notes VARCHAR(1000) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_appointments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_appointments_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
  INDEX idx_appointments_user (user_id),
  INDEX idx_appointments_service (service_id),
  INDEX idx_appointments_datetime (appointment_date, appointment_time),
  INDEX idx_appointments_status (status)
);

INSERT INTO services (id, name, description, price, image_url, icon, category, availability_status, is_featured, featured_rank)
VALUES
  (1, 'General Consultation', 'Fast appointments for checkups and everyday health concerns.', 49.99, NULL, 'GC', 'Consultation', 1, 1, 1),
  (2, 'Dental Care', 'Professional cleaning, oral exams, and preventive dental treatment.', 69.99, NULL, 'DC', 'Dental', 1, 1, 2),
  (3, 'Physiotherapy Session', 'Personalized movement recovery and posture-focused rehabilitation.', 79.99, NULL, 'PT', 'Rehabilitation', 1, 1, 3),
  (4, 'Mental Wellness', 'Confidential counseling sessions for stress and emotional support.', 59.99, NULL, 'MW', 'Mental Health', 1, 0, 999),
  (5, 'Skin Treatment', 'Dermatology appointments for skin health and cosmetic concerns.', 89.99, NULL, 'ST', 'Dermatology', 1, 0, 999),
  (6, 'Eye Examination', 'Vision assessment and specialist guidance for eye care.', 39.99, NULL, 'EE', 'Vision', 1, 0, 999)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  price = VALUES(price),
  image_url = VALUES(image_url),
  icon = VALUES(icon),
  category = VALUES(category),
  availability_status = VALUES(availability_status),
  is_featured = VALUES(is_featured),
  featured_rank = VALUES(featured_rank);

INSERT INTO testimonials (id, user_name, comment, rating, is_published, featured_rank)
VALUES
  (1, 'Aanya Verma', 'QuickAppointment saved me so much time. I booked my checkup in less than a minute.', 5, 1, 1),
  (2, 'Daniel Brooks', 'The date and time picker is super easy to use. Smooth and professional experience.', 5, 1, 2),
  (3, 'Sofia Khan', 'I love how clear everything is. Services, pricing, and booking all in one place.', 4, 1, 3)
ON DUPLICATE KEY UPDATE
  user_name = VALUES(user_name),
  comment = VALUES(comment),
  rating = VALUES(rating),
  is_published = VALUES(is_published),
  featured_rank = VALUES(featured_rank);
