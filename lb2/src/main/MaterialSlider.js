import WoolImage from "./wool.jpg";
import ShellImage from "./shelk.jpg";
import CottonImage from "./cotton.jpg";
import React, {useCallback, useEffect, useState} from "react";


const photos = [WoolImage, ShellImage, CottonImage];
const text = ["Wool", "Shell", "Cotton"];
const url = "#material=";
const timeMove = 6000
const countPhotos = photos.length - 1

function MaterialSlider() {
    const [index, setIndex] = useState(1)
    const [material, setMaterial] = useState({
        text: text[0],
        href: url + text[0],
        image: {
            backgroundImage: `url('${photos[0]}')`
        }
    })

    const setPhoto = useCallback(() => {

        setMaterial({
            text: text[index],
            href: url + text[index],
            image: {
                backgroundImage: `url('${photos[index]}')`
            }
        })
        setIndex(prev => {
            return prev === countPhotos ? 0 : ++prev
        })
    }, [index])

    useEffect(() => {
        const interval = setInterval(setPhoto, timeMove);
        return (() => {
            clearInterval(interval)
        })
    }, [setPhoto])

    return (
        <>
            <div id="img-material" className={'material-image'} style={material.image}>
                <div style={{marginTop: "380px"}}>
                    <a id="slide-href" href={material.href}>
                        <p id="slide-text-p" className="slide-text"
                           style={{
                               color: 'white',
                               fontSize: '40px'
                           }}>{material.text}</p>
                    </a>
                </div>
            </div>
        </>
    )
}

export default MaterialSlider