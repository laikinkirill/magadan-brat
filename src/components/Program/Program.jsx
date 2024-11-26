import c from './program.module.scss'

const Program = ({ program }) => {
	return (
		<div className={c.program}>
			{Object.values(program).map((elem, i) => (
				<div className={c.programCard} key={i}>
					<h4 className={c.programCardTitle}>{elem?.val?.title}</h4>
					<div className={c.programCardText}>{elem?.val?.text}</div>
				</div>
			))}
		</div>
	)
}

export { Program }
