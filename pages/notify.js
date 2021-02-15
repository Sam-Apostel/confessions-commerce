import getRawBody from 'raw-body';
import styles from '../styles/Notify.module.css';
import {useRouter} from "next/router";
import {useEffect} from "react";
import {submitPreOrder} from "../utils/firebase";
import { colors, designs, sizes, types } from '../data/products';

export const getServerSideProps = async ({req}) => {
	if (req.method === 'POST') {
		const body = await getRawBody(req)
		const props = Object.fromEntries(body.toString("utf-8").split('&').map(entry => {
			const [key, value] = entry.split('=');
			return [key, decodeURIComponent(value)];
		}));

		const lookup = (dict, luid) => dict.find(({id}) => id === luid);
		const type = lookup(types, props.type);
		const color = lookup(colors, props.color);
		const design = lookup(designs, props.design);

		// save props to db
		await submitPreOrder(props.email, type.stringId, color.stringId, design.stringId, props.size);

		return  {props: {
				...props,
				type,
				color,
				design
			}};
	}
	return { props: {fail: true} };
};

export default function Notify(props) {
	const router = useRouter();

	useEffect(() => {
		if (props.fail) return router.push('/detail');
	}, [props.fail]);

	return (
		<div className={styles.notify}>
			<div className={styles.text}>
				<h1>Thank you for your interest.</h1>
				<span>We will notify you at <span>{props.email}</span> when sales open.</span>
			</div>
			<div className={styles.boxWrapper} style={{backgroundColor: props.color.value }}>
				<figure className={styles.box}>
					<img src={`/boxes/box.png`}  alt={''} />
					<img src={`/boxes/color-${(props.color.id ?? 1)}.png`}  alt={''} />
					<img src={`/boxes/type-${(props.type.id ?? 1)}.png`}  alt={''} />
					<img src={`/boxes/design-${(props.design.id ?? 1)}.png`}  alt={''} />
				</figure>
			</div>
		</div>
	);
}
