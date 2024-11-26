import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/img/logo.svg'
import { Container } from '../'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Button } from '../../UI'

import styles from './Header.module.scss'

const LINKS = [
	{
		url: '/tours',
		text: (
			<span>
				Туристические <br /> направления
			</span>
		),
	},
	{
		url: '/jack-london-lake',
		text: (
			<span>
				Озеро Джека <br /> Лондона
			</span>
		),
	},
	// {
	//    url: '/souvenir',
	//    text: <span>Сувенирная <br /> продукция</span>
	// },
	{
		url: '/freeride',
		text: (
			<span>
				Фрирайд <br />в магадане
			</span>
		),
	},
]

function Header({ className }) {
	const [isOpen, setIsOpen] = useState(false)

	const location = useLocation()

	const headerRef = useRef(null)

	useEffect(() => {
		let prevScrollpos = window.scrollY

		window.onscroll = function () {
			const nav = headerRef.current
			const currentScrollPos = window.scrollY
			if (!nav) return
			if (prevScrollpos < currentScrollPos) {
				nav.style.transform = 'translate(0, -100%)'
			} else {
				nav.style.transform = 'translate(0, 0)'
			}
			prevScrollpos = currentScrollPos
		}
	}, [location.pathname])

	return (
		<>
			<div className={styles.header_empty}></div>

			<header
				ref={headerRef}
				className={classNames(styles.header, className)}
				style={{ transform: 'translate(0px, 0px)' }}
			>
				<Container>
					<div className={styles.wrapper}>
						<Link to='/' className={styles.menuItem}>
							<img
								src={logo}
								alt='ТвояКолыма'
								className={styles.logo}
								style={{ pointerEvents: 'none' }}
							/>
						</Link>

						<div className={styles.menu}>
							{LINKS.map(link => (
								<Link
									to={link.url}
									className={classNames(
										styles.menuItem,
										location.pathname === link.url ? styles._active : ''
									)}
								>
									<span>{link.text}</span>
								</Link>
							))}
						</div>

						<div className={styles.menuMobile}>
							<div
								className={classNames({
									[styles.burger]: true,
									[styles.burgerClose]: isOpen,
								})}
								onClick={() => setIsOpen(!isOpen)}
							>
								<span></span>
							</div>
							{isOpen ? (
								<div className={styles.modal}>
									{LINKS.map(link => (
										<Link
											to={link.url}
											className={classNames(
												styles.modalMenuItem,
												location.pathname === link.url ? styles._active : ''
											)}
										>
											<span>{link.text}</span>
										</Link>
									))}
								</div>
							) : (
								<></>
							)}
						</div>

						<div className={styles.headerButton}>
							<Button
								to='mailto:tvoyakolyma@mail.ru'
								small={true}
								defaultLink={true}
							>
								Заказать тур
							</Button>
						</div>
					</div>
				</Container>
			</header>
		</>
	)
}

export { Header }
