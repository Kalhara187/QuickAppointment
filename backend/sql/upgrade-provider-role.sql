ALTER TABLE users
  MODIFY role ENUM('user', 'admin', 'provider') NOT NULL DEFAULT 'user';

ALTER TABLE appointments
  ADD COLUMN provider_id INT UNSIGNED NULL AFTER service_id,
  ADD CONSTRAINT fk_appointments_provider FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE SET NULL,
  ADD INDEX idx_appointments_provider (provider_id);