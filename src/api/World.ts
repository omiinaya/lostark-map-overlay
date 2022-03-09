import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWorld = createAsyncThunk('world/getWorld', async () => {
    return await Promise.all(
        [
            fetch(`https://papunika.com/map/data/zones/us/overworld.json`).then(world => world.json()),
            fetch(`https://papunika.com/map/data/zones/us/00000.json`).then(zone => zone.json())
        ]
    ).then(([world, zone]) => {
        world.markers = zone.markers;
        return world;
    })
})