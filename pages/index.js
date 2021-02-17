import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useRouter} from 'next/router';
import Image from 'next/image';
import products from '../data/products';

export const getServerSideProps = async () => {
	const items = products.colors.flatMap( color =>
		products.designs.flatMap( design =>
			products.types.map( type => (
				{color, design, type}
			))
		)
	).sort(() => Math.random() - 0.5);

	return {
		props: {
			items,
		},
	}
}

export default function Home({items}) {
	const router = useRouter();
	const renderSweater = ({color, design, type}, index) => {
		return (
			<figure
				key={`color-${color.id}_design-${design.id}_type-${type.id}`}
				className={styles.shopItem}
				onClick={() => router.push({
					pathname: '/detail',
					query: {
						color: color.id,
						design: design.id,
						type: type.id
					}
				} )}
				style={{backgroundColor: color.value}}
			>
				<Image
					src={`/sweaters/color-${color.id}_type-${type.id}.png`}
					alt={`${type.name} with color ${color.name}`}
					className={styles.shopItemImage}
					layout={'fill'}
					objectFit={'contain'}
					// sizes={''}
					// priority={index < 14}
				/>
				<Image
					src={`/sweaters/design-${design.id}.png`}
					alt={`design ${design.name}`}
					className={styles.shopItemImageDesign}
					layout={'fill'}
					objectFit={'contain'}
				/>
			</figure>
		);

	}

	return (
		<div className={styles.container}>
			<Head>
				<title>confessions shop</title>
				<meta name={'Description'} content={'Buy the latest UAntwerpen confessions merch.'}/>
				<link rel="icon" href="/favicon.ico" />

				<meta name="facebook-domain-verification" content="41r3v9ds3l6ub8kt3nit0aya4vqdod" />

				<meta property="og:url" content="https://confessions.link/" />
				<meta property="og:title" content="confessions shop" />
				<meta property="og:description" content="Buy the latest UAntwerpen confessions merch." />
				<meta property="og:image" content="/openGraph.png" />
			</Head>

			<main className={styles.main}>
				<div className={styles.gallery}>
					{items.map(renderSweater)}
				</div>
			</main>
		</div>
	)
}
