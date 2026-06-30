import { Text, View, Button } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [curItemIdx, setCurItemIdx] = useState(0);

    const curItem = items.length !== 0 ? items[curItemIdx] : {};
    const itemNumInBusket =
        items.length !== 0 ?
            items.reduce((sum, item) => sum + item["qty"], 0)
        :   0;
    const cost = (
        items.length !== 0 ?
            items.reduce((sum, item) => sum + item["price"] * item["qty"], 0)
        :   0).toFixed(2);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                for (let item of data) {
                    item["qty"] = 0;
                }
                setItems(data);
            });
    }, []);

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
            <View style={{ flex: 1, justifyContent: "center" }}>
                {items.length !== 0 ?
                    <BadgerSaleItem
                        {...curItem}
                        itemNumInBusket={curItem["qty"]}
                        changeItemInBusketBy={(n) => {
                            setItems((prev) => {
                                prev[curItemIdx]["qty"] += n;
                                return [...prev];
                            });
                        }}
                    />
                :   <Text style={{ textAlign: "center" }}>Loading...</Text>}
            </View>
            <View>
                <Text style={{ textAlign: "center" }}>
                    You have {itemNumInBusket} item(s) costing ${cost} in your
                    cart!
                </Text>
            </View>
        </View>
    );
}
