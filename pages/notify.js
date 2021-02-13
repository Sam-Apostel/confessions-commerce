import getRawBody from 'raw-body';
import styles from '../styles/Notify.module.css';
import {useRouter} from "next/router";
import {useEffect} from "react";
import {submitPreOrder} from "../utils/firebase";

export const getServerSideProps = async ({req}) => {
	if (req.method === 'POST') {
		const body = await getRawBody(req)
		const props = Object.fromEntries(body.toString("utf-8").split('&').map(entry => {
			const [key, value] = entry.split('=');
			return [key, decodeURIComponent(value)];
		}));

		// save props to db
		await submitPreOrder(props.email, props.type, props.color, props.design, props.size);

		return  {props};
	}
	return { props: {fail: true} };
};

export default function Notify(props) {
	const router = useRouter();

	useEffect(() => {
		if (props.fail) return router.push('/detail');
	}, [props.fail]);

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

	return (
		<div className={styles.notify}>
			<div className={styles.text}>
				<h1>Thank you for your interest.</h1>
				<span>We will notify you at <span>{props.email}</span> when sales open.</span>
			</div>
			<div className={styles.boxWrapper} style={{backgroundColor: colors.find(({id}) => id === (props.color ?? '1')).value }}>
				<figure className={styles.box}>
					<img src={`/boxes/box.png`}  alt={''} />
					<img src={`/boxes/color-${(props.color ?? 1)}.png`}  alt={''} />
					<img src={`/boxes/type-${(props.type ?? 1)}.png`}  alt={''} />
					<img src={`/boxes/design-${(props.design ?? 1)}.png`}  alt={''} />
				</figure>
			</div>
		</div>
	);
}
