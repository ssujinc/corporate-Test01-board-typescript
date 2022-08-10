CREATE TABLE `view` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `board_id` int,
  `user_id` int,
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE
);