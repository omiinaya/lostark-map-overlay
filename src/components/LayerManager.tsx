import React, { Fragment } from "react";
import { useAppSelector } from "../store/hooks";
import { selectZone } from "../store/slices/Zone";
import World from "./World";
import Zone from "./Zone";

export default () => {
    const zone = useAppSelector(selectZone)

    return (
        <Fragment>
            { (zone && zone !== null) ? <Zone /> : <World />}
        </Fragment>
    )
}