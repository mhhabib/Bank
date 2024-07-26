import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './utils/swagger.json';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import rateLimiter from './middlewares/rateLimitMiddleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Swagger Documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Implement cors policy
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
	res.status(500).json({ message: err.message });
});

export default app;
