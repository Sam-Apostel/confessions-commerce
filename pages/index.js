import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react";

export default function Home() {

	const colors = 6;
	const designs = 5;

	const renderSweaters = () => {
		const sweaters = [];
		for (let color = 1; color <= colors; color++){
			for (let design = 1; design <= designs; design++) {
				sweaters.push({color, design});
			}
		}
		return (
			<div className={styles.gallery}>
				{sweaters.sort(() => Math.random() - 0.5).map(renderSweater)}
			</div>
		);
	};

	const renderSweater = ({color, design}, index) => {
		return (
			<figure
				key={`color-${color}_design_${design}`}
				className={styles.shopItem}
			>
				<img
					src={`/sweaters/color-${color}_design-${design}.png`} alt={`sweater color ${color} with design ${design}`}
					className={styles.shopItemImage}
				/>
			</figure>
		);

	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{renderSweaters()}
			</main>

			{/*<footer className={styles.footer}>*/}
			{/*	/!*<a*!/*/}
			{/*	/!*	href="https://bunkerstore.be"*!/*/}
			{/*	/!*	target="_blank"*!/*/}
			{/*	/!*	rel="noopener noreferrer"*!/*/}
			{/*	/!*>*!/*/}
			{/*	<span>*/}
			{/*		Powered by{' '}*/}
			{/*		<img src="/bunkerstore.svg" alt="bunkerstore Logo" className={styles.logo} />*/}
			{/*	</span>*/}

			{/*	/!*</a>*!/*/}
			{/*</footer>*/}
		</div>
	)
}
