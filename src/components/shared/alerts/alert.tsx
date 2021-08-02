import React, { useState, useEffect } from 'react';

import styles from './alert.scss'

import success from 'assets/alertImages/check.svg'
import error from 'assets/alertImages/error.svg'
import info from 'assets/alertImages/info.svg'
import warning from 'assets/alertImages/warning.svg'


export enum AlertBoxPositions {
    TL = "top_left",
    TR = "top_right",
    BL = "bottom_left",
    BR = "bottom_right"
}



const AlertBoxImgs : Map<string, string> = new Map<string, string>();
AlertBoxImgs.set("Info", info)
AlertBoxImgs.set("Success", success)
AlertBoxImgs.set("Warning", warning)
AlertBoxImgs.set("Error", error)

export type AlertBox = {
    id: number
    title: string
    description: string
    backgroundColor: string,
    type: "Info" | "Success" | "Warning" | "Error",
    autoDelete?: boolean,
    dismissTime?: number
}

type Props = {
    alerts: Array<AlertBox>,
    position: AlertBoxPositions,
    autoDelete?: boolean,
    dismissTime?: number
}

const Alert =({ alerts, position}: Props) => {

    const [list, setList] = useState(alerts);

    useEffect(() => {
        setList([...list,...alerts]);
    }, [alerts]);

    useEffect(() => {
        alerts.map((alert) =>{
            setTimeout(() => {
                if (alert.autoDelete) {
                    deleteAlert(alert.id)
                }
            }, (alert.dismissTime)? alert.dismissTime : 5000)
        })
    }, [alerts]);


    const deleteAlert = (id: number) => {
        console.log(id)
        let newList = list
        const listItemIndex = newList.findIndex(e => e.id === id);
        newList.splice(listItemIndex, 1);
        setList([...newList]);
        console.log(list)
    }

    return (
        <>
            <div className={`${styles.notification_container} ${styles[`${position}`]}`}>
                {
                    list.map((alert, i) =>     
                        <div 
                            key={i}
                            className={`${styles.notification} ${styles.alert} ${styles[`${position}`]}`}
                            style={{ backgroundColor: alert.backgroundColor }}
                        >
                            <button onClick={() => deleteAlert(alert.id)}>
                                X
                            </button>
                            <div className={`${styles.notification_image}`}>
                                <img src={AlertBoxImgs.get(`${alert.type}`)} alt="" />
                            </div>
                            <div>
                                <p className={styles.notification_title}>{alert.title}</p>
                                <p className={styles.notification_message}>
                                    {alert.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}



export default Alert;