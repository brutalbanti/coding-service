import { IoClose } from 'react-icons/io5';

interface popup {
    addToWatchlist: any,
    isPopUp: any,
    handlerPopUp: any,
    handlerValueTitle: any,
    valueTitle: string,
    handlerValueTexterea: any,
    valueDescription: string,
    isEdit: boolean,
    handleConfirmEdit: any
}

export const NewTaskPopUp = ({ addToWatchlist, isPopUp, handlerPopUp, handlerValueTitle, valueTitle, handlerValueTexterea, valueDescription, isEdit, handleConfirmEdit }: popup) => {
    return (
        <div className={isPopUp ? "popup visible" : "popup"}>
            <div className="popup__container">
                <div className="planner__form">
                    <IoClose className='close-form' onClick={handlerPopUp} />
                    <h2 className="planner__title">Add a New Task</h2>
                    <input type="text" className="planner__input sign__input" placeholder='Title' value={valueTitle} onChange={handlerValueTitle} />
                    <textarea name="" id="" cols={30} rows={10} className="planner__texterea" placeholder='Description' value={valueDescription} onChange={handlerValueTexterea}></textarea>
                    {isEdit === true &&
                        <button onClick={handleConfirmEdit} className="planner__button">Update</button>
                    }{
                        isEdit === false &&
                        <button onClick={addToWatchlist} className="planner__button">Add Task</button>
                    }
                </div>
            </div>
        </div>
    )
}