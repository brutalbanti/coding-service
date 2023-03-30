import './planner.css';
import { db } from '../../../config/firebaseConfig';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { auth } from '../../../config/firebase';
import React, { useEffect, useState } from 'react';
import { NewTaskPopUp } from '../../NewTaskPopUp';

export const SectionPlanner = () => {
    const [scheduled, setScheduled] = useState<any>([]);
    const [development, setDevelopment] = useState<any>([]);
    const [made, setMade] = useState<any>([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isPopUp, setIsPopUp] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tempId, setTempId] = useState('');
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            onValue(ref(db, `/${user.uid}`), (snapshot) => {
                setScheduled([]);
                setDevelopment([]);
                setMade([]);
                const data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((todo: any) => {
                        let dataSet = todo;
                        setScheduled((oldArray: any) => [...oldArray, dataSet.scheduled]);
                        setDevelopment((oldArray: any) => [...oldArray, dataSet.development])
                        setMade((oldArray: any) => [...oldArray, dataSet.made])
                    })
                }
                setScheduled((old: any) => old.filter((x: any) => x !== undefined));
                setDevelopment((old: any) => old.filter((x: any) => x !== undefined));
                setMade((old: any) => old.filter((x: any) => x !== undefined));
            })
        })
    }, [])


    const handlerPopUp = () => {
        setIsPopUp(!isPopUp);
    }
    const addToWatchlist = () => {
        const uidd = uid();
        auth.onAuthStateChanged((user: any) => {
            set(ref(db, `/${user.uid}/${uidd}/scheduled`), {
                title: title,
                description: description,
                uidd: uidd
            })
        })
        handlerPopUp();
        setTitle('');
        setDescription('');
    }

    const addToDevelopment = (titleDev: string, descriptionDev: string, uiditem: string) => {
        const uidd = uid();
        auth.onAuthStateChanged((user: any) => {
            set(ref(db, `/${user.uid}/${uidd}/development`), {
                title: titleDev,
                description: descriptionDev,
                uidd: uidd
            })
            remove(ref(db, `/${user.uid}/${uiditem}`))
        })
    }

    const handlerValueTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handlerValueTexterea = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleDelete = (uiditem: any) => {
        auth.onAuthStateChanged((user: any) => {
            remove(ref(db, `/${user.uid}/${uiditem}`))
        })
        console.log(uiditem)
    }
    const handleUpdate = (item: any) => {
        setIsPopUp(true);
        setIsEdit(true);
        setTitle(item.title);
        setDescription(item.description);
        setTempId(item.uidd);
        console.log(item)
    }

    const handleConfirmEdit = () => {
        auth.onAuthStateChanged((user: any) => {
            console.log(tempId)
            update(ref(db, `/${user.uid}/${tempId}/scheduled`), {
                title: title,
                description: description,
                uidd: tempId
            })
        })
        setTitle('');
        setDescription('');
        handlerPopUp();
        setIsEdit(false);
    }

    const addToMade = (titleDev: string, descriptionDev: string, uiditem: string) => {
        const uidd = uid();
        auth.onAuthStateChanged((user: any) => {
            set(ref(db, `/${user.uid}/${uidd}/made`), {
                title: titleDev,
                description: descriptionDev,
                uidd: uidd
            })
            remove(ref(db, `/${user.uid}/${uiditem}`))
        })
    }
    const addToScheduled = (titleDev: string, descriptionDev: string, uiditem: string) => {
        const uidd = uid();
        auth.onAuthStateChanged((user: any) => {
            set(ref(db, `/${user.uid}/${uidd}/scheduled`), {
                title: titleDev,
                description: descriptionDev,
                uidd: uidd
            })
            remove(ref(db, `/${user.uid}/${uiditem}`))
        })
    }


    return (
        <section className="page__planner">
            <div className="planner__container">
                <h1 className="planner__title">Planner For Programming</h1>
                <div className="planner__items">
                    <div className='block-item'>
                        <h2 className="planner-item__title">Scheduled</h2>
                        <div className="planner__item scheluded plan">
                            <div className="planner__item-content">
                                {
                                    scheduled.map((todo: any, index: number) => (
                                        <div className="item-content" key={index}>
                                            <h2 className='planner-item__sub-title'>{todo.title}</h2>
                                            <p className='planner-item__sub-description'>{todo.description}</p>
                                            <div className="planner-items__button">
                                                <button className="planner-item__next planner-btn" onClick={() => addToDevelopment(todo.title, todo.description, todo.uidd)}>To development</button>
                                                <button className="planner-item__change planner-btn" onClick={() => handleUpdate(todo)}>Change</button>
                                                <button className="planner-item__delete planner-btn delete" onClick={() => handleDelete(todo.uidd)}>Delete</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <button className='planner-item__button' onClick={handlerPopUp}>Add New Task</button>
                    </div>
                    <div className="planner__item plan">
                        <h2 className="planner-item__title">Development</h2>
                        <div className="planner__item-content">
                            {
                                development.map((todo: any, index: number) => (
                                    <div className="item-content" key={index}>
                                        <h2 className='planner-item__sub-title'>{todo.title}</h2>
                                        <p className='planner-item__sub-description'>{todo.description}</p>
                                        <div className="planner-items__button">
                                            <button className="planner-item__next planner-btn" onClick={() => addToScheduled(todo.title, todo.description, todo.uidd)}>To Scheduled</button>
                                            <button className="planner-item__next planner-btn" onClick={() => addToMade(todo.title, todo.description, todo.uidd)}>To made</button>
                                            <button className="planner-item__delete planner-btn delete" onClick={() => handleDelete(todo.uidd)}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="planner__item plan">
                        <h2 className="planner-item__title">Made</h2>
                        <div className="planner__item-content">
                            {
                                made.map((todo: any, index: number) => (
                                    <div className="item-content" key={index}>
                                        <h2 className='planner-item__sub-title'>{todo.title}</h2>
                                        <p className='planner-item__sub-description'>{todo.description}</p>
                                        <div className="planner-items__button">
                                            <button className="planner-item__next planner-btn" onClick={() => addToDevelopment(todo.title, todo.description, todo.uidd)}>To Development</button>
                                            <button className="planner-item__delete planner-btn delete" onClick={() => handleDelete(todo.uidd)}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <NewTaskPopUp
                    addToWatchlist={addToWatchlist}
                    isPopUp={isPopUp}
                    handlerPopUp={handlerPopUp}
                    handlerValueTitle={handlerValueTitle}
                    valueTitle={title}
                    handlerValueTexterea={handlerValueTexterea}
                    valueDescription={description}
                    isEdit={isEdit}
                    handleConfirmEdit={handleConfirmEdit}
                />
            </div>
        </section>
    )
}