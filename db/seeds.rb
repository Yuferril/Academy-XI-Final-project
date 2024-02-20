User.create(username: 'Admin', password: 'admin123', role: 'admin', email: 'Admin@poke.com', firstName: 'Admin', lastName: 'Smith')
User.create(username: 'Ash', password: 'ash123', role: 'user', email: 'Ash@poke.com', firstName: 'Ash', lastName: 'Ketchum')
User.create(username: 'a', password: 'a', role: 'user', email: 'a', firstName: 'a', lastName: 'a')

Pokemon.create(name: 'Pikachu', description: 'Electric type Pokemon', element_type: 'Electric', price: 49.99)
Pokemon.create(name: 'Charmander', description: 'Fire type Pokemon', element_type: 'Fire', price: 29.99)
Pokemon.create(name: 'Squirtle', description: 'Water type Pokemon', element_type: 'Water', price: 20.99)



puts 'Seed data created successfully.'