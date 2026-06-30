import { Text, View, Button } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [curItemIdx, setCurItemIdx] = useState(0);
    const [busket, setBusket] = useState({});

    const curItem = items.length !== 0 ? items[curItemIdx] : {};
    const curItemNumInBusket = curItem.name ? busket[curItem.name] : 0;

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                const initBusket = {};
                for (let item of data) {
                    initBusket[item.name] = 0;
                }
                setBusket(initBusket);
            });
    }, []);

    function changeItemInBusketBy(item, n) {
        if (Object.hasOwn(busket, item)) {
            setBusket((prev) => {
                prev[item] += n;
                return { ...prev };
            });
        } else {
            setBusket({ ...busket, [item]: 1 });
        }
    }

    return (
        <View style={{ height: "85%" }}>
            <Text style={{ fontSize: 28 }}>Welcome to Badger Mart!</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    marginVertical: 10,
                }}
            >
                <Button
                    key={curItemIdx <= 0 ? "prev-disabled" : "prev-enabled"}
                    title="PREVIOUS"
                    disabled={curItemIdx <= 0}
                    onPress={() => {
                        setCurItemIdx((prev) => prev - 1);
                    }}
                />
                <Button
                    title="NEXT"
                    key={
                        curItemIdx >= items.length ?
                            "next-disabled"
                        :   "next-enabled"
                    }
                    disabled={curItemIdx >= items.length}
                    onPress={() => {
                        setCurItemIdx((prev) => prev + 1);
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                {items.length !== 0 ?
                    <BadgerSaleItem
                        {...curItem}
                        itemNumInBusket={curItemNumInBusket}
                        changeItemInBusketBy={changeItemInBusketBy}
                    />
                :   <Text>Loading...</Text>}
            </View>
        </View>
    );
}
