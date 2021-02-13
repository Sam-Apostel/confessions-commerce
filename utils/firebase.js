import admin from 'firebase-admin';

try {
	admin.initializeApp({
		credential: admin.credential.cert({
			project_id: process.env.FIREBASE_PROJECT_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY,
			client_email: process.env.FIREBASE_CLIENT_EMAIL
		}),
		databaseURL: process.env.FIREBASE_CLIENT_DB_URL,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET
	});
} catch (error) {
	/*
	 * We skip the "already exists" message which is
	 * not an actual error when we're hot-reloading.
	 */
	if (!/already exists/u.test(error.message)) {
		// eslint-disable-next-line no-console
		console.error('Firebase admin initialization error', error.stack);
	}
}

export const firestore = admin.firestore();

const preOrders = firestore.collection('commerce').doc('preorders');


export const submitPreOrder = async (email, type, color, design, size) => {
	const preOrder = {email, type, color, design, size, submitted: new Date()};
	const unionRes = await preOrders.update({
		[`type-${type}_color-${color}_design-${design}_size-${size}`]: admin.firestore.FieldValue.arrayUnion(email)
	});
	return true
};
