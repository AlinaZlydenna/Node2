import styles from './measurements.module.css'
import {toTittleCase} from "../tools/stringTools";
import React from "react";

const measurementName = ['width', 'volume', 'height', 'length']

const Measurement = ({measurement, id}) => {
    return (
        <div className={styles.measurementBox}>
            <p className={styles.measurementTextName}>{measurement.name}</p>

            <div className={styles.measurementBoxValue}>
                {measurementName.map((n, i) =>
                    <label key={`label-${n}-${i}-${id}`} className={styles.measurementTextLabel}>{toTittleCase(n)}
                        <em>cm</em></label>
                )}

                {measurementName.map((n, i) =>
                    <p key={`p-${n}-${i}-${id}`} type="number"
                       className={styles.measurementTextValue}>{measurement[n] ? measurement[n] : ''}</p>
                )}
            </div>
        </div>
    )
}

export default Measurement