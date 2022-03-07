import Fuse from "fuse.js";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectWorld } from "../store/slices/World";
import { selectZone } from "../store/slices/Zone";
import { IWorldZone } from "../interfaces/IWorld";
import { getWorld } from "../api/World";
import { getZone } from "../api/Zone";

export default () => {
  const dispatch = useAppDispatch();
  const [query, updateQuery] = useState("");
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const world = useAppSelector(selectWorld);
  const zone = useAppSelector(selectZone);
  const ref = useRef(null);

  let characterResults = null;

  if (world && world.zones) {
    const worldList = world.zones.map((zone) => {
      return { name: zone.name, location: zone.location };
    });

    const worldMarkerList = world.markers.map((marker) => {
      return marker.data.map((data) => {
        return { name: data.popupTitle, location: data.coordinates };
      });
    });

    const list = [...worldList, ...worldMarkerList[0]];

    const search = new Fuse(list, {
      includeScore: true,
      minMatchCharLength: 3,
      keys: ["name"],
    });

    let results = search.search("");
    characterResults = results.map((result) => result.item);
    results = search.search(query, { limit: 10 });
    characterResults = query
      ? results.map((character) => character.item)
      : null;
  }

  const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
    updateQuery(e.currentTarget.value);
  };

  const onFocus = (e: any) => {
    setIsComponentVisible(true);
  };

  function getZ(zones: Array<IWorldZone>, name: string) {
    return zones.filter((zone) => zone.name === name)[0];
  }

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Fragment>
      {zone === null && (
        <div ref={ref} className="search-form">
          <input
            type="text"
            name="search-input"
            id="search-input"
            onChange={onSearch}
            onFocus={onFocus}
          />
          {characterResults && isComponentVisible && (
            <div className="search-results">
              {characterResults.map((result, index) => {
                return (
                  <div
                    key={`searchResult${index}`}
                    onClick={() => {
                      dispatch(getWorld()).then((data) => {
                        const zones = data.payload.zones;
                        const zone = getZ(zones, result.name);
                        dispatch(getZone(zone));
                        updateQuery("");
                        (
                          document.querySelector(
                            "#search-input"
                          ) as HTMLInputElement
                        ).value = "";
                      });
                    }}
                  >
                    {result.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
