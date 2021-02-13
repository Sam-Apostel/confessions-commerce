import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useRouter} from "next/router";

export default function Home() {
	const router = useRouter();

	const colors = [
		{
			name: 'Beauty Bush',
			id: '1',
			value: '#EDB4B4'
		},
		{
			name: 'Regent St Blue',
			id: '2',
			value: '#AED9EB'
		},
		{
			name: 'Scorpion',
			id: '3',
			value: '#5F5F5F'
		},
		{
			name: 'Copper Rust',
			id: '4',
			value: '#8D4B4B'
		},
		{
			name: 'Waikawa Gray',
			id: '5',
			value: '#555B98'
		},
		{
			name: 'Tubleweed',
			id: '6',
			value: '#E2AE8F'
		},
	];
	const designs = 5;
	const types = 2;

	const renderSweaters = () => {
		const sweaters = [];
		colors.forEach( (color) => {
			for (let design = 1; design <= designs; design++) {
				for (let type = 1; type <= types; type++){
					sweaters.push({color, design, type});
				}

			}
		});
		return (
			<div className={styles.gallery}>
				{sweaters.sort(() => Math.random() - 0.5).map(renderSweater)}
			</div>
		);
	};

	const renderSweater = ({color, design, type}, index) => {
		return (
			<figure
				key={`color-${color.id}_design-${design}_type-${type}`}
				className={styles.shopItem}
				onClick={() => router.push({pathname: '/detail', query: {color: color.id, design, type}} )}
				style={{backgroundColor: color.value}}
			>
				<img
					src={`/sweaters/color-${color.id}_type-${type}.png`} alt={`sweater color ${color.id} with design ${design}`}
					className={styles.shopItemImage}
				/>
				<img
					src={`/sweaters/design-${design}.png`} alt={`sweater color ${color.id} with design ${design}`}
					className={styles.shopItemImageDesign}
				/>
			</figure>
		);

	}

	return (
		<div className={styles.container}>
			<Head>
				<title>confessions shop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{renderSweaters()}
			</main>
		</div>
	)
}
