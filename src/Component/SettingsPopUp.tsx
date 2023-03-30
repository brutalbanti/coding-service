interface popup {
    isSettings: boolean,
    handlerTimer: any,
    timerTime: number,
    handlerSaveClose: any
}

export const SettingsPopUp = ({isSettings, handlerTimer, timerTime, handlerSaveClose}: popup) => {
    return (
        <div className={isSettings ? "popup visible" : "popup"}>
            <div className="popup__container">
                <div className="planner__form">
                    <h2 className="planner__title">Settings Timer</h2>
                    <input type="number" className="planner__input sign__input" placeholder='Timer Time' value={timerTime} onChange={(e) =>  handlerTimer(e)}/>
                        <button className="planner__button" onClick={handlerSaveClose}>Save And Close</button>
                </div>
            </div>
        </div>
    )
}