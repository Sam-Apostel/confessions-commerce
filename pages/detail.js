import Head from 'next/head'
import styles from '../styles/Detail.module.css';
import {useState} from "react";
import {useRouter} from "next/router"

export default function Detail(props) {
	const colors = [
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
			name: 'Waikawa Gray',
			id: '5',
			value: '#555B98'
		},
		{
			name: 'Copper Rust',
			id: '4',
			value: '#8D4B4B'
		},
		{
			name: 'Beauty Bush',
			id: '1',
			value: '#EDB4B4'
		},
		{
			name: 'Tubleweed',
			id: '6',
			value: '#E2AE8F'
		},
	];
	const designs = [
		{
			name: 'Confessions sunset icon',
			id: '4',
		},
		{
			name: 'Icon',
			id: '1',
		},
		{
			name: 'REGELET',
			id: '2',
		},
		{
			name: 'WEODEND',
			id: '5',
		},
		{
			name: 'Confessions sunset',
			id: '3',
		},
	];
	const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
	const types = [
		{
			id: '1',
			name: 'Comfy Hoody'
		},
		{
			id: '2',
			name: 'Cozy Crewneck'
		}
	];

	const router = useRouter();

	const [type, setType] = useState(props.type ?? '1');

	const [color, setColor] = useState(props.color ?? '1');
	const [hoverColor, setHoverColor] = useState(undefined);

	const [design, setDesign] = useState(props.design ?? '1');
	const [hoverDesign, setHoverDesign] = useState(undefined);

	const [size, setSize] = useState(props.size ?? 'm');
	const [hoverSize, setHoverSize] = useState(undefined);

	const [email, setEmail] = useState('');

	const displayColor = hoverColor ?? color;
	const displayDesign = hoverDesign ?? design;
	const displaySize = hoverSize ?? size;

	const renderColor = ({id, value}) => {
		return (
			<div
				key={id}
				className={id === color ? styles.selectorColorSelected : styles.selectorColor}
				onClick={() => {
					setColor(id);
					router.replace({
						pathname: '/detail',
						query: {color: id, design, type, size},
					});
				}}
				onMouseOver={() => setHoverColor(id)}
			>
				<span
					className={id === color ? styles.colorDisplaySelected : styles.colorDisplay}
					style={{backgroundColor: value}}
				/>
			</div>

		)
	};


	const renderDesigns = ({name, id}) => {
		return (
			<div
				key={id}
				className={id === design ? styles.selectorDesignSelected : styles.selectorDesign}
				onClick={() => {
					setDesign(id);
					router.replace({
						pathname: '/detail',
						query: {color, design: id, type, size},
					});
				}}
				onMouseOver={() => setHoverDesign(id)}
				onMouseOut={(e) => {
					e.stopPropagation()
				}}
			>
				<div>
					<img
						src={`/sweaters/design-${id}.png`}
						alt={name}
						className={styles.designDisplay}
						style={{backgroundColor: colors.find(({id}) => id === displayColor).value}}
					/>
				</div>

			</div>
		)
	};

	const renderSize = (value) => {
		return (
			<div
				key={value}
				className={value === size ? styles.selectorSizeSelected : styles.selectorSize}
				onClick={() => {
					setSize(value);
					router.replace({
						pathname: '/detail',
						query: {color, design, type, size: value},
					});
				}}
				onMouseOver={() => setHoverSize(value)}
				onMouseOut={(e) => {
					e.stopPropagation()
				}}
			>
				{value}
			</div>
		);
	}

	const renderType = ({id, name}) => (
		<div
			key={id}
			onClick={() => {
				setType(id);
				router.replace({
					pathname: '/detail',
					query: {color, design, type: id, size},
				});
			}}
			className={id === type ? styles.typeSelected : styles.typeNotSelected}
		>{name}</div>
	);

	return (
		<div className={styles.container}>
			<Head>
				<title>confessions shop - detail</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className={styles.main}>
				<div
					className={styles.heroWrapper}
					style={{backgroundColor: colors.find(({id}) => id === displayColor).value}}
				>
					<div
						className={`${styles.hero} ${styles[`size-${displaySize}`]}`}
					>
						{types.map(({name: typeName, id: typeId}) => (
							colors.map(({name: colorName, id: colorId}) => (
								<img
									key={`type-${typeId}_color-${colorId}`}
									src={`/sweaters/color-${colorId}_type-${typeId}.png`}
									alt={`${typeName} with color ${colorName}`}
									className={colorId === displayColor && typeId === type ? styles.heroImgSelected : styles.heroImg}
								/>
							))
						))}
						<img
							src={`/sweaters/design-${displayDesign}.png`}
							alt={`design ${designs.find(({id}) => id === design).name}`}
							className={styles.heroImgDesign}
						/>
					</div>
				</div>

				<div className={styles.infoWrapper}>
					<div
						className={styles.info}
					>
						<div className={type === types[0].id ? styles.typeContainerFirstSelected : styles.typeContainer}>
							{types.map(renderType)}
						</div>


						<section>
							<h2>Pick a color</h2>
							<div className={styles.colors} onMouseLeave={() => setHoverColor(undefined)}>
								{colors.map(renderColor)}
							</div>
						</section>
						<section>
							<h2>Choose your design</h2>
							<div className={styles.designs} onMouseLeave={() => setHoverDesign(undefined)}>
								{designs.map(renderDesigns)}
							</div>
						</section>
						<section>
							<h2>Choose your size</h2>
							<div className={styles.sizes} onMouseLeave={() => setHoverSize(undefined)}>
								{sizes.map(renderSize)}
							</div>
						</section>
						<section>
							<h2>Your sweater</h2>
							<div className={styles.detailGrid}>
								<span>type</span>
								<span>color</span>
								<span>design</span>
								<span>size</span>
								<span>{types.find(({id}) => id === type).name}</span>
								<span>{colors.find(({id}) => id === color).name}</span>
								<span>{designs.find(({id}) => id === design).name}</span>
								<span>{size}</span>
							</div>

							{/*<div className={styles.price}>€15.00</div>*/}
						</section>
						<section>
							<h2>Get notified</h2>
							<form className={styles.notify} action={'/notify'} method="POST" >
								<input type="hidden" name="type" value={type} />
								<input type="hidden" name="design" value={design} />
								<input type="hidden" name="color" value={color} />
								<input type="hidden" name="size" value={size} />
								<input name={'email'} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'email'} />
								<input type={'submit'} value={'Recieve an email when sales open'} />
							</form>

						</section>
					</div>
				</div>
			</main>
		</div>
	);
}

Detail.getInitialProps = async ({query}) => {
	const {color, design, type, size} = query

	return {color, design, type, size}
}
