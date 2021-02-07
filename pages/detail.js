import Head from 'next/head'
import styles from '../styles/Detail.module.css';
import {useState} from "react";

export default function Detail(props) {
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
	const designs = [
		{
			name: 'Icon',
			id: '1',
		},
		{
			name: 'Regelet',
			id: '2',
		},
		{
			name: 'Simple text',
			id: '3',
		},
		{
			name: 'Icon + Simple text',
			id: '4',
		},
		{
			name: 'WEODEND',
			id: '5',
		},
	];
	const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
	const [color, setColor] = useState(props.color ?? '1');
	const [hoverColor, setHoverColor] = useState(undefined);
	const [design, setDesign] = useState(props.design ?? '1');
	const [hoverDesign, setHoverDesign] = useState(undefined);
	const [size, setSize] = useState('m');

	const displayColor = hoverColor ?? color;
	const displayDesign = hoverDesign ?? design;

	const renderColor = ({ name, id, value }) => {
		return (
			<div
				key={id}
				className={styles.selectorColor}
				onClick={() => setColor(id)}
				onMouseOver={() => setHoverColor(id)}
				onMouseOut={() => setHoverColor(undefined)}
			>
				<span
					className={styles.colorDisplay}
					style={{backgroundColor: value}}
				/>
				<span
					className={styles.colorName}
				>{name}</span>
			</div>

		)
	};


	const renderDesigns = ({name, id}) => {
		return (
			<div
				key={id}
				className={styles.selectorDesign}
				onClick={() => setDesign(id)}
				onMouseOver={() => setHoverDesign(id)}
				onMouseOut={() => setHoverDesign(undefined)}
			>
				<img
					src={`/sweaters/color-${displayColor}_design-${id}.png`}
					alt={name}
					className={styles.designDisplay}
				/>
			</div>
		)
	};

	const renderSize = (value) => {
		return (
			<div
				key={value}
				className={value === size ? styles.selectorSizeSelected : styles.selectorSize}
				onClick={() => setSize(value)}
			>
				{value}
			</div>
		);
	}


	return (
		<div className={styles.container}>
			<Head>
				<title>confessions shop - detail</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<img
					src={`/sweaters/color-${displayColor}_design-${displayDesign}.png`}
					alt={`sweater color ${displayColor} with design ${displayDesign}`}
					className={styles.hero}
				/>
				<div
					className={styles.info}
				>
					<h1>Comfy Hoody</h1>
					<section>
						<h2>Pick a color</h2>
						<div className={styles.colors}>
							{colors.map(renderColor)}
						</div>
					</section>
					<section>
						<h2>Choose your design</h2>
						<div className={styles.designs}>
							{designs.map(renderDesigns)}
						</div>
					</section>
					<section>
						<h2>Choose your size</h2>
						<div className={styles.sizes}>
							{sizes.map(renderSize)}
						</div>
					</section>
					<section>
						<h2>Get your hoody</h2>
						<span>price: €15.00</span>

					</section>
				</div>
			</main>
		</div>
	);
}

Detail.getInitialProps = async ({ query }) => {
	const {color, design} = query

	return {color, design}
}
