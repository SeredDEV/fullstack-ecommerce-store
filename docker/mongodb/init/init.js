// Script de inicialización para MongoDB
// Este script se ejecuta automáticamente cuando se crea el contenedor por primera vez

// Cambiar a la base de datos de la aplicación
db = db.getSiblingDB('fullstack_store');

// Crear usuario para la aplicación
db.createUser({
  user: 'app_user',
  pwd: 'app_password123',
  roles: [
    {
      role: 'readWrite',
      db: 'fullstack_store'
    }
  ]
});

// Crear colección de usuarios con índices
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

// Crear colección de sesiones
db.createCollection('sessions');
db.sessions.createIndex({ sessionId: 1 }, { unique: true });
db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Crear colección de productos
db.createCollection('products');
db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ createdAt: -1 });

// Crear colección de órdenes
db.createCollection('orders');
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

// Insertar datos de prueba
db.users.insertMany([
  {
    username: 'admin',
    email: 'admin@fullstack.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: admin123
    userType: 'admin',
    privileges: ['admin-access', 'user-management', 'product-management'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    username: 'usuario_demo',
    email: 'usuario@fullstack.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: user123
    userType: 'user',
    privileges: ['user-access'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
]);

db.products.insertMany([
  {
    name: 'Producto Demo 1',
    description: 'Descripción del producto demo 1',
    price: 99.99,
    category: 'electronica',
    stock: 50,
    imageUrl: '/images/demo1.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    name: 'Producto Demo 2',
    description: 'Descripción del producto demo 2',
    price: 149.99,
    category: 'ropa',
    stock: 25,
    imageUrl: '/images/demo2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
]);

print('✅ Base de datos inicializada correctamente con datos de prueba');
