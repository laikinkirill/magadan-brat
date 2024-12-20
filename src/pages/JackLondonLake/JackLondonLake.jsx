import { Fragment, useState } from 'react'
import { Header, ReviewsBlock } from '../../components'
import { Footer } from '../../components/Footer/Footer'
import { Program } from '../../components/Program/Program'
import { Button, Text } from '../../UI'
import classNames from 'classnames'
import {
	JACK_LONDON_MAP_POINTS,
	useJackLondonLakeStore,
} from '../../store/jackLondonLake'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import c from './jackLondonLake.module.scss'

import routesMap from '../../assets/img/jackLondonLake/routes_map.jpg'

function JackLondonLake() {
	return (
		<>
			<Header className={c.header} />

			<div className={c.page_body}>
				<FirstBlock />

				<DescriptionBlock />

				<HikingRoutesMapBlock />

				<PhotosBlock />

				<RoutesBlock />

				<PriceBlock />

				<EquipmentBlock />

				<ImportantToKnowBlock />

				<ReviewsBlock />
			</div>

			<Footer />
		</>
	)
}

const MapPoint = ({
	id,
	children,
	textOrientation,
	position,
	data,
	popupPosition,
	pointTextHide,
	onClick,
	onClose,
}) => {
	const [activePoint, setActivePoint] = useState(false)

	const onClickHandler = () => {
		setActivePoint(prev => !prev)
		onClick?.()
	}

	const closePopup = e => {
		if (e.currentTarget === e.target) {
			setActivePoint(false)
			onClose?.()
		}
	}

	return (
		<>
			<div
				className={classNames(
					c.map_point,
					c[textOrientation],
					activePoint ? c._active : ''
				)}
				style={{ ...position }}
				onClick={onClickHandler}
			>
				{
					<span
						className={classNames(
							id % 2 === 0 ? c._left : '',
							pointTextHide ? c._hidden : ''
						)}
					>
						{data?.val?.text}
					</span>
				}
				{children}
			</div>

			<div
				className={classNames(
					c.map_popup,
					activePoint ? c._active : '',
					c[popupPosition]
				)}
				onClick={closePopup}
			>
				<div className={c.popup_body}>
					<div className={c.img_wrapper}>
						{data?.img?.val && <img src={data.img.val} alt='' />}
						<p className={c.title}>{data?.val?.text}</p>
					</div>
				</div>
			</div>
		</>
	)
}

const FirstBlock = () => {
	const store = useJackLondonLakeStore()

	return (
		<div className={classNames(c.first_block, '_container')}>
			<h1>{store.first_block?.title?.val}</h1>

			<div className={c.img_wrapper}>
				<img src={store.first_block?.img?.val} alt='' height={650} />

				<div className={c.features}>
					<a href='https://wa.me/79965590730' target='_blank' rel='noreferrer'>
						<svg
							width='18'
							height='20'
							viewBox='0 0 18 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z'
								fill='#43A047'
							/>
						</svg>
						{store.first_block?.dates?.[1]?.val}
					</a>
					<a href='https://wa.me/79965590730' target='_blank' rel='noreferrer'>
						<svg
							width='18'
							height='20'
							viewBox='0 0 18 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z'
								fill='#FBC02D'
							/>
						</svg>
						{store.first_block?.dates?.[2]?.val}
					</a>
					<a href='https://wa.me/79965590730' target='_blank' rel='noreferrer'>
						<svg
							width='18'
							height='20'
							viewBox='0 0 18 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z'
								fill='#FB8C00'
							/>
						</svg>
						{store.first_block?.dates?.[3]?.val}
					</a>
					<a href='https://wa.me/79965590730' target='_blank' rel='noreferrer'>
						<svg
							width='18'
							height='20'
							viewBox='0 0 18 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z'
								fill='#F4511E'
							/>
						</svg>
						{store.first_block?.dates?.[4]?.val}
					</a>
				</div>
			</div>

			<div className={c.text}>
				<h3>{store.first_block?.text?.val}</h3>
				<Button
					to='mailto:tvoyakolyma@mail.ru'
					small={true}
					defaultLink={true}
					className={classNames(c.buttonD)}
				>
					Заказать тур
				</Button>

				<Button
					to='https://wa.me/79965590730'
					className={classNames(c.buttonM)}
					small={true}
					defaultLink
				>
					Заказать тур
				</Button>
			</div>
		</div>
	)
}

const DescriptionBlock = () => {
	const [show, setShow] = useState(false)

	const store = useJackLondonLakeStore()

	return (
		<div className={c.description_block}>
			<div className={classNames('_container', show ? c._show : '')}>
				<h2>{store.description_block?.title?.val}</h2>

				<div className={classNames(c.text, show ? c._show : '')}>
					<Text text={store.description_block?.text?.val} />
				</div>

				<button onClick={() => setShow(prev => !prev)}>
					{show ? 'Свернуть' : 'Читать подробнее'}
				</button>
			</div>
		</div>
	)
}

const HikingRoutesMapBlock = () => {
	const store = useJackLondonLakeStore()

	return (
		<div className={classNames(c.hiking_routes_map_block, '_container')}>
			<h2>
				<Text text={store.hiking_routes_map_block?.title?.val} />
			</h2>

			<div className={c.map}>
				<img src={routesMap} alt='' />

				<p className={c.map_text} style={{ top: '27%', left: '31%' }}>
					Р. ПУРГА
				</p>
				<p className={c.map_text} style={{ top: '32%', left: '34%' }}>
					Р. СТУДЕНЫЙ
				</p>
				<p
					className={c.map_text}
					style={{ top: '42.5%', left: '38%', textAlign: 'right' }}
				>
					ОЗЕРО <br /> НЕВЕДИМКА
				</p>
				<p className={c.map_text} style={{ top: '43%', left: '53%' }}>
					ОЗЕРО <br /> СОСЕДНЕЕ
				</p>
				<p className={c.map_text} style={{ top: '58.5%', left: '28%' }}>
					Р. НЕВЕДОМЫЙ
				</p>

				{JACK_LONDON_MAP_POINTS?.map(point => (
					<Fragment key={point.id}>
						<MapPoint
							id={point.id}
							textOrientation={point.textOrientation}
							position={point.position}
							popupPosition={point?.popupPosition || ''}
							data={store.map_points[point.id]}
							pointTextHide
						/>
						<hr className={c.dotted_line} />
					</Fragment>
				))}
			</div>
		</div>
	)
}

const PhotosBlock = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	const store = useJackLondonLakeStore()

	return (
		<div className={c.photosWrapper}>
			<div className={classNames(c.photos_block, '_container')}>
				<h2>Фотографии</h2>

				<Swiper
					style={{
						'--swiper-navigation-color': '#fff',
						'--swiper-pagination-color': '#fff',
					}}
					loop={true}
					spaceBetween={10}
					navigation={true}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					modules={[FreeMode, Navigation, Thumbs]}
					className='mySwiper2'
				>
					{Object.values(store.photos_block?.images).map((img, index) => (
						<SwiperSlide key={index}>
							<img src={img.val} alt='' />
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					onSwiper={setThumbsSwiper}
					loop={true}
					spaceBetween={10}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className='mySwiper'
				>
					{Object.values(store.photos_block?.images).map((img, index) => (
						<SwiperSlide key={index}>
							<img src={img.val} alt='' />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

const RoutesBlock = () => {
	const store = useJackLondonLakeStore()

	return (
		<div className={classNames(c.routes_block, '_container')}>
			<h2>{store.routes_block?.title?.val}</h2>

			<Program program={store?.accordion} />
			{/* <Accordion accordion={store?.accordion} /> */}

			<div className={c.btns}>
				<Button
					to='mailto:tvoyakolyma@mail.ru'
					small={true}
					defaultLink={true}
					className={classNames(c.jackButton, c.buttonD)}
				>
					Заказать тур
				</Button>

				<Button
					to='https://wa.me/79965590730'
					className={classNames(c.jackButton, c.buttonM)}
					small={true}
					defaultLink
				>
					Заказать тур
				</Button>

				{/* <Button className={c.jackButton} to="https://wa.me/79965590730">
         Заказать Тур
         </Button> */}
			</div>
		</div>
	)
}

const PriceBlock = () => {
	const price_block = useJackLondonLakeStore(state => state.price_block)

	return (
		<div className={c.PriceBlock}>
			<div className={'_container'}>
				<h1 className={c.PriceBlockTitle}>{price_block.price.val} ₽</h1>
				<div className={c.List}>

					<ul className={c.ListBlock}>
						<li className={c.ListTitle}>В стоимость путешествия входит:</li>
            {price_block.included.map(el => (
              <li key={el.val.text} className={c.ListItem}>{el.val.text}</li>
            ))}
					</ul>

					<ul className={c.ListBlock}>
						<li className={c.ListTitle}>В стоимость не входит:</li>
						{price_block.not_included.map(el => (
              <li key={el.val.text} className={c.ListItem}>{el.val.text}</li>
            ))}
					</ul>
          
				</div>
			</div>
		</div>
	)
}

const EquipmentBlock = () => {

  const equipment_block = useJackLondonLakeStore(state => state.equipment_block)

	const [toggleSwitcher, setToggleSwitcher] = useState(1)

  console.log(equipment_block.our);
	return (
		<div className={'_container'}>
			<div className={c.Switcher}>
				<div
					className={classNames({
						[c.SwitcherItem]: true,
						[c.SwitcherItemActive]: toggleSwitcher === 1,
					})}
					onClick={() => {
						setToggleSwitcher(1)
					}}
				>
					Мы выдаем
				</div>
				<div
					className={classNames({
						[c.SwitcherItem]: true,
						[c.SwitcherItemActive]: toggleSwitcher === 2,
					})}
					onClick={() => {
						setToggleSwitcher(2)
					}}
				>
					Нужно свое
				</div>
			</div>

			{toggleSwitcher === 1 ? (
				<div className={c.List}>

          {equipment_block.our.map(el => (
            <ul className={c.ListBlock} key={el.title} >
              <li className={c.ListTitle}>{el.title.val}</li>
              {el.values?.map((item, i) => (
                <li key={i} className={c.ListItem}>{item.val.text}</li>
              ))}
            </ul>
          ))}
					{/* <ul className={c.ListBlock}>
						<li className={c.ListTitle}>Личное снаряжение</li>
						<li className={c.ListItem}>Палатка 2-х, 3-х местная</li>
						<li className={c.ListItem}>Рюкзак объемом от 80 литров</li>
						<li className={c.ListItem}>Накидка влагозащитная на рюкзак</li>
						<li className={c.ListItem}>
							Спальный мешок с температурой комфорта ~ 0 -10 С°
						</li>
						<li className={c.ListItem}>
							Набор посуды: кружка, миска, ложка-вилка
						</li>
						<li className={c.ListItem}>Аренда походного снаряжения</li>
					</ul>

					<ul className={c.ListBlock}>
						<li className={c.ListTitle}>Общественное снаряжение</li>
						<li className={c.ListItem}>Авиабилеты в Магадан и обратно</li>
						<li className={c.ListItem}>Личные расходы на сувениры и прочее</li>
						<li className={c.ListItem}>Индивидуальная страховка</li>
					</ul> */}
				</div>
			) : (
				<div className={c.List}>
          {equipment_block.their.map(el => (
            <ul className={c.ListBlock} key={el.title} >
              <li className={c.ListTitle}>{el.title.val}</li>
              {el.values?.map((item, i) => (
                <li key={i} className={c.ListItem}>{item.val.text}</li>
              ))}
            </ul>
          ))}
					{/* <ul className={c.ListBlock}>
						<li className={c.ListTitle}>Обувь</li>
						<li className={c.ListItem}>Высокие треккинговые ботинки</li>
						<li className={c.ListItem}>
							Сандалии или кроксы для лагеря и бродов
						</li>
						<li className={c.ListItem}>Болотные сапоги из ЭВА или ПВХ</li>
						<li className={c.ListTitle}>Другая экипировка</li>
						<li className={c.ListItem}>
							Солнцезащитные очки. Категория фильтра S3+
						</li>
						<li className={c.ListItem}>Бутылка для воды</li>
						<li className={c.ListItem}>Накомарник</li>
						<li className={c.ListItem}>Беруши</li>
						<li className={c.ListItem}>Свисток на экстренный случай</li>
						<li className={c.ListItem}>Мешок для грязных вещей</li>
						<li className={c.ListItem}>Пакет для мусора</li>
						<li className={c.ListItem}>Гермомешок для документов</li>
						<li className={c.ListTitle}>Гигиена и здоровье</li>
						<li className={c.ListItem}>Полотенце синтетическое</li>
						<li className={c.ListItem}>
							Шампунь, мыло, зубная паста — всё ~ по 50мл и с пометкой эко/био,
							зубная щётка и нить
						</li>
						<li className={c.ListItem}>Влажная туалетная бумага смываемая</li>
						<li className={c.ListItem}>Бумажные платки</li>
						<li className={c.ListItem}>Солнцезащитный крем SPF 30+ и выше</li>
						<li className={c.ListItem}>Гигиеническая помада</li>
						<li className={c.ListItem}>
							Пенообразующие губки CV Medica или аналоги
						</li>
						<li className={c.ListItem}>
							Индивидуальная аптечка: лекарства от хронических заболеваний,
							подходящие вам обезболивающие, антигистаминные и желудочные
							средства, препараты от простуды, бинт, пластырь мозольный compeed,
							средство от солнечных ожогов. Если есть проблемы с коленями, то
							наколенники
						</li>
					</ul>

					<ul className={c.ListBlock}>
						<li className={c.ListTitle}>Документы</li>
						<li className={c.ListItem}>Паспорт</li>
						<li className={c.ListItem}>Спортивная медицинская страховка</li>
						<li className={c.ListItem}>
							Деньги наличными и/или банковская карта
						</li>
						<li className={c.ListTitle}>Необязательные вещи</li>
						<li className={c.ListItem}>Зарядка для телефона</li>
						<li className={c.ListItem}>Портативный аккумулятор</li>
						<li className={c.ListItem}>Стул туристический</li>
						<li className={c.ListItem}>Подушка надувная</li>
						<li className={c.ListItem}>Гамаши</li>
						<li className={c.ListItem}>Мембранные носки</li>
						<li className={c.ListItem}>Термос</li>
						<li className={c.ListItem}>Удочка или спиннинг</li>
					</ul> */}
				</div>
			)}
		</div>
	)
}

const ImportantToKnowBlock = () => {
	const store = useJackLondonLakeStore()

	const [checked, setChecked] = useState(null)

	return (
		<div className={c.important_to_know_block}>
			<div className={'_container'}>
				<h2>{store.important_to_know_block?.title?.val}</h2>

				<ul className={c.accordion}>
					{Object.values(store.important_to_know_block?.accordion).map(
						(elem, i) => (
							<li key={i}>
								<input
									type='radio'
									name='elem'
									checked={checked === i}
									onChange={() => {}}
									onClick={() =>
										setChecked(prev => {
											if (prev === i) {
												return null
											}
											return i
										})
									}
								/>
								<span>
									<Text text={elem?.val?.text} />
								</span>
								<i></i>
								<p>{elem?.val?.title}</p>
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	)
}

export { JackLondonLake }
