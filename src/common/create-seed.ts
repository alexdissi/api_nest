import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from 'src/user/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'boilerplate_test',
  entities: [User],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connection established');

  const userRepository = AppDataSource.getRepository(User);

  const users = [];

  for (let i = 1; i <= 30; i++) {
    const user = new User();
    user.name = `user${i}`;
    user.email = `user${i}@example.com`;
    user.password = await argon2.hash(`password${i}`);
    users.push(user);
  }

  await userRepository.save(users);

  console.log('Seed completed: 30 users created');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
});
