import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewTicketMutation } from './ticketsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';

const NewTicketForm = () => {
	const [addNewTicket, { isLoading, isSuccess, isError, error }] =
		useAddNewTicketMutation();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [completed, setCompleted] = useState(false);
	const [roles, setRoles] = useState(['Employee']);

	useEffect(() => {
		if (isSuccess) {
			setTitle('');
			setText('');
			navigate('/dash/tickets');
		}
	}, [isSuccess, navigate]);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onTextChanged = (e) => setText(e.target.value);

	//const onCompletedChanged = (e) => setCompleted(e.target.checked);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setRoles(values);
	};
	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role}>
				{role}
			</option>
		);
	});

	const canSave = [title.length, text.length].every(Boolean) && !isLoading;
	const OnSaveTicketClicked = async (e) => {
		e.preventDefault();
		addNewTicket({ title, text, roles });
	};

	const content = (
		<>
			<form className='' onSubmit={OnSaveTicketClicked}>
				<div className='form__title-row'>
					<h3>Please add a new ticket here</h3>

					<div className='form__action-buttons'>
						<button className='icon-button' title='Save' disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>

				<label className='form__label' htmlFor='title'>
					Title:
				</label>
				<input
					className='form__input'
					id='title'
					name='title'
					type='text'
					value={title}
					onChange={onTitleChanged}
				></input>

				<label className='form__label' htmlFor='text'>
					Text:
				</label>
				<input
					className='form__input'
					id='text'
					name='text'
					type='text'
					value={text}
					onChange={onTextChanged}
				></input>

				<label className='form__label' htmlFor='Assigned'>
					Assigned:
				</label>
				<select
					className='form__select'
					id='roles'
					name='roles'
					multiple={true}
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</form>
		</>
	);
	return content;
};

export default NewTicketForm;
